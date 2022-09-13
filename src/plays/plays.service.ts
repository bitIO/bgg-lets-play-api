import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { parse } from 'date-fns';
import { BggService } from '../bgg/bgg.service';
import { DatabaseService } from '../database/database.service';
import {
  BggApiResponseDataPlay,
  BggApiResponseDataPlayItem,
  BggApiResponseDataPlaysItemPlayer,
} from '../types';

@Injectable()
export class PlaysService {
  private readonly logger = new Logger(PlaysService.name);

  constructor(private bgg: BggService, private database: DatabaseService) {}

  private async upsertPlay(play: BggApiResponseDataPlayItem, userId: number) {
    try {
      const id = +play.id;
      const playData = await this.database.play.upsert({
        create: {
          date: parse(play.date, 'yyyy-MM-dd', new Date()),
          gameId: +play.item.objectid,
          id: +play.id,
          length: +play.length,
          location: play.location,
          quantity: +play.quantity,
          userId,
        },
        update: {
          date: parse(play.date, 'yyyy-MM-dd', new Date()),
          gameId: +play.item.objectid,
          length: +play.length,
          location: play.location,
          quantity: +play.quantity,
          userId,
        },
        where: {
          id,
        },
      });

      let players: BggApiResponseDataPlaysItemPlayer[];
      if (!Array.isArray(play.players.player)) {
        players = Array.isArray(play.players.player)
          ? play.players.player
          : [play.players.player];
      } else {
        players = play.players.player;
      }

      await this.database.playPlayer.deleteMany({
        where: {
          playId: playData.id,
        },
      });
      await this.database.playPlayer.createMany({
        data: players.map((player) => {
          return {
            color: player.color,
            name: player.name,
            new: player.new === '1',
            playId: playData.id,
            rating: player.rating,
            score: player.score,
            startposition: player.startposition,
            username: player.username,
            win: player.win === '1',
          };
        }),
      });
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(play);
      throw error;
    }
  }

  find() {
    return this.database.play.findMany({
      include: {
        Game: true,
        Players: true,
        User: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  findById(id: number) {
    return this.database.play.findUnique({
      include: {
        Game: true,
        Players: true,
        User: true,
      },
      where: {
        id,
      },
    });
  }

  async update(user: User, response: BggApiResponseDataPlay[]) {
    const items = response || (await this.bgg.getPlays(user.userName));
    const plays = items.flatMap((i) => {
      return i.play;
    });
    const promises = [];
    plays.forEach((play) => {
      promises.push(this.upsertPlay(play, user.id));
    });

    return Promise.all(promises);
  }
}
