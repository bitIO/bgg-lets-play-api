import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BggService } from '../bgg/bgg.service';
import { DatabaseService } from '../database/database.service';
import { GameService } from '../game/game.service';
import { PlaysService } from '../plays/plays.service';
import { BggApiResponseDataCollectionItem } from '../types';
import { isExpired } from '../utils';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private bgg: BggService,
    private config: ConfigService,
    private database: DatabaseService,
    private games: GameService,
    private plays: PlaysService,
  ) {}

  private readUserFromDatabase(userName: string) {
    return this.database.user.findUnique({
      include: {
        Plays: {
          include: {
            Game: true,
            Players: true,
          },
        },
        UserCollection: {
          include: {
            Game: {
              include: {
                GameImage: true,
                GameInfo: true,
                GameMarket: true,
                GameRating: true,
              },
            },
          },
          orderBy: {
            Game: {
              name: 'asc',
            },
          },
        },
        UserGameStatus: true,
      },
      where: {
        userName,
      },
    });
  }

  private async updateGameStatus(
    game: BggApiResponseDataCollectionItem,
    userId,
  ) {
    try {
      await this.database.userGameStatus.upsert({
        create: {
          fortrade: game.status.fortrade === '1',
          gameId: +game.objectid,
          own: game.status.own === '1',
          preordered: game.status.preordered === '1',
          prevowned: game.status.prevowned === '1',
          userId,
          want: game.status.want === '1',
          wanttobuy: game.status.wanttobuy === '1',
          wanttoplay: game.status.wanttoplay === '1',
          wishlist: game.status.wishlist === '1',
        },
        update: {
          fortrade: game.status.fortrade === '1',
          own: game.status.own === '1',
          preordered: game.status.preordered === '1',
          prevowned: game.status.prevowned === '1',
          want: game.status.want === '1',
          wanttobuy: game.status.wanttobuy === '1',
          wanttoplay: game.status.wanttoplay === '1',
          wishlist: game.status.wishlist === '1',
        },
        where: {
          gameId_userId: {
            gameId: +game.objectid,
            userId,
          },
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(`Game: ${game.name.text} / #${game.objectid}`);
    }
  }

  findAll() {
    return this.database.user.findMany({});
  }

  findByUserName(userNames: string[]) {
    return this.database.user.findMany({
      include: {
        Plays: {
          include: {
            Game: true,
            Players: true,
          },
        },
        UserCollection: {
          include: {
            Game: {
              include: {
                GameImage: true,
                GameInfo: true,
                GameMarket: true,
                GameRating: true,
              },
            },
          },
          orderBy: {
            Game: {
              name: 'asc',
            },
          },
        },
      },
      where: {
        userName: {
          in: userNames,
        },
      },
    });
  }

  async findOneOrSync(userName: string) {
    this.logger.debug('request user info', {
      userName,
    });

    const user = await this.readUserFromDatabase(userName);

    if (
      user &&
      !isExpired(
        user.updatedAt,
        +this.config.getOrThrow('CACHE_TTL_IN_SECONDS'),
      )
    ) {
      this.logger.debug('User data still valid', {
        updatedAt: user.updatedAt,
        userName,
      });

      return user;
    }

    this.logger.debug('User data not found or expired', {
      userName,
    });

    await this.update(userName);

    return this.readUserFromDatabase(userName);
  }

  async update(userName: string) {
    const [bggResponseUser, bggResponseCollection, bggResponsePlays] =
      await Promise.all([
        this.bgg.getUser(userName),
        this.bgg.getCollection(userName, true),
        this.bgg.getPlays(userName),
      ]);
    const gameIds = [
      ...new Set(
        bggResponseCollection.item.map((item) => {
          return +item.objectid;
        }),
      ),
    ];
    bggResponsePlays.forEach(({ play }) => {
      play.forEach((p) => {
        const gameId = +p.item.objectid;
        if (!gameIds.includes(gameId)) {
          gameIds.push(gameId);
        }
      });
    });

    const gamesInfo = await this.games.retrieveAndUpdateGamesInfo(gameIds);
    const dbUser = await this.database.user.upsert({
      create: {
        avatar: bggResponseUser.avatarlink.value,
        firstName: bggResponseUser.firstname.value,
        id: +bggResponseUser.id,
        lastName: bggResponseUser.lastname.value,
        userName: bggResponseUser.name,
      },
      update: {
        avatar: bggResponseUser.avatarlink.value,
        firstName: bggResponseUser.firstname.value,
        lastName: bggResponseUser.lastname.value,
        userName: bggResponseUser.name,
      },
      where: {
        userName,
      },
    });
    await this.database.userCollection.deleteMany({
      where: {
        userId: dbUser.id,
      },
    });
    await this.database.userCollection.createMany({
      data: gamesInfo.map((gameInfo) => {
        return {
          gameId: gameInfo.id,
          userId: dbUser.id,
        };
      }),
      skipDuplicates: true,
    });
    await this.plays.update(dbUser, bggResponsePlays);

    await Promise.all(
      bggResponseCollection.item.map((game) => {
        return this.updateGameStatus(game, dbUser.id);
      }),
    );

    return dbUser;
  }

  remove(userName: string) {
    return this.database.user.delete({
      where: {
        userName,
      },
    });
  }
}
