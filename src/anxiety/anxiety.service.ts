import { Injectable } from '@nestjs/common';
import { decode } from 'he';
import { BggService } from '../bgg/bgg.service';
import {
  BggAPIResponseDataGameItem,
  BggApiResponseDataPlaysItem,
} from '../bgg/types';
import { CacheService } from '../cache/cache.service';
import { BggGame, BggPlay, BggUser } from './types';

function parseUserPlayItem(play: BggApiResponseDataPlaysItem): BggPlay {
  return {
    date: new Date(play.date),
    game: {
      id: +play.item.objectid,
      name: decode(play.item.name),
    },
    id: +play.id,
    length: +play.length,
    location: play.location,
    players: Array.isArray(play.players.player)
      ? play.players.player.map((player) => {
          return {
            color: player.color,
            name: player.name,
            new: player.new ? player.new === '1' : undefined,
            rating: player.rating,
            score: player.score,
            startposition: player.startposition,
            userid: player.userid ? +player.userid : undefined,
            username: player.username,
            win: player.win ? player.win === '1' : undefined,
          };
        })
      : [
          {
            color: play.players.player.color,
            name: play.players.player.name,
            new: play.players.player.new
              ? play.players.player.new === '1'
              : undefined,
            rating: play.players.player.rating,
            score: play.players.player.score,
            startposition: play.players.player.startposition,
            userid: play.players.player.userid
              ? +play.players.player.userid
              : undefined,
            username: play.players.player.username,
            win: play.players.player.win
              ? play.players.player.win === '1'
              : undefined,
          },
        ],
    quantity: +play.quantity,
  };
}

function getGamesFromUsers(users: BggUser[]) {
  const games: { [key: number]: BggGame } = {};
  users.forEach((user) => {
    user.collection.forEach((game) => {
      if (!games[game.id]) {
        games[game.id] = game;
      }
    });
  });

  return Object.values(games);
}

@Injectable()
export class AnxietyService {
  constructor(private bgg: BggService, private cache: CacheService) {}

  async findOne(userName: string): Promise<BggUser> {
    const cachedData = await this.cache.loadUser(userName);
    if (cachedData) {
      return cachedData;
    }

    const [user, collection, plays] = await Promise.all([
      this.bgg.getUser(userName),
      this.bgg.getCollection(userName),
      this.bgg.getPlays(userName),
    ]);

    const userData: BggUser = {
      avatar: user.avatarlink.value,
      collection: collection.item.map<BggGame>((item) => {
        return {
          id: +item.objectid,
          images: {
            image: item.image,
            thumbnail: item.thumbnail,
          },
          info: {
            maxPlayTime: +item.stats.maxplaytime,
            maxPlayers: +item.stats.maxplayers,
            minPlayTime: +item.stats.minplaytime,
            minPlayers: +item.stats.minplayers,
            numOwners: +item.stats.numowned,
            playingTime: +item.stats.playingtime,
          },
          name: decode(item.name.text),
          plays: item.numplays,
          publishedYear: item.yearpublished,
          stats: {
            comments: 0,
            rating: {
              average: +item.stats.rating.average.value,
              bayesaverage: +item.stats.rating.bayesaverage.value,
              median: +item.stats.rating.median.value,
              stddev: +item.stats.rating.stddev.value,
              users: +item.stats.rating.usersrated.value,
              value:
                item.stats.rating.value !== 'N/A'
                  ? +item.stats.rating.value
                  : null,
            },
            weight: 0,
          },
          status: {
            fortrade: item.status.fortrade !== '0',
            lastmodified: new Date(item.status.lastmodified),
            own: item.status.own !== '0',
            preordered: item.status.preordered !== '0',
            prevowned: item.status.prevowned !== '0',
            want: item.status.want !== '0',
            wanttobuy: item.status.wanttobuy !== '0',
            wanttoplay: item.status.wanttoplay !== '0',
            wishlist: item.status.wishlist !== '0',
          },
        };
      }),
      firstName: user.firstname.value,
      id: +user.id,
      lastName: user.lastname.value,
      plays: plays.reduce((previous, current) => {
        const userPlays = current.play.map((play) => {
          return parseUserPlayItem(play);
        });

        return previous.concat(userPlays);
      }, []),
      userName: user.name,
    };

    this.cache.saveUser(userData);

    return userData;
  }

  private async getNotPlayedGamesForUser(user: BggUser, otherUsers: BggUser) {
    const combinedGames = getGamesFromUsers([user, otherUsers]);
    const notPlayedGamesMap = [user, otherUsers].reduce<
      Record<number, BggGame>
    >((previousResult, currentUser) => {
      const updatedResult = {
        ...previousResult,
      };
      currentUser.plays.forEach((play) => {
        if (
          !updatedResult[play.game.id] &&
          !this.playPlayedTogether(play, [user, otherUsers])
        ) {
          updatedResult[play.game.id] = combinedGames.find((game) => {
            return game.id === play.game.id;
          });
        }
      });

      return updatedResult;
    }, {});

    const missingGamesInfoIds = Object.keys(notPlayedGamesMap)
      .filter((key) => {
        return notPlayedGamesMap[key] === undefined;
      })
      .map((gameId) => {
        return +gameId;
      });
    const missingGamesData = await this.bgg.getGamesInfo(missingGamesInfoIds);
    const data: BggAPIResponseDataGameItem[] = Array.isArray(
      missingGamesData.item,
    )
      ? missingGamesData.item
      : [missingGamesData.item];

    data.forEach((gameData) => {
      notPlayedGamesMap[+gameData.id] = {
        id: +gameData.id,
        images: {
          image: gameData.image,
          thumbnail: gameData.thumbnail,
        },
        info: {
          maxPlayTime: +gameData.maxplaytime.value,
          maxPlayers: +gameData.maxplayers.value,
          minPlayTime: +gameData.minplaytime.value,
          minPlayers: +gameData.minplayers.value,
          numOwners: +gameData.statistics.ratings.owned.value,
          playingTime: +gameData.playingtime.value,
          weight: 0,
        },
        market: {
          owned: +gameData.statistics.ratings.owned.value,
          trading: +gameData.statistics.ratings.trading.value,
          wanting: +gameData.statistics.ratings.wanting.value,
          whishing: +gameData.statistics.ratings.wishing.value,
        },
        name: Array.isArray(gameData.name)
          ? decode(gameData.name[0].value)
          : decode(gameData.name.value),
        publishedYear: +gameData.yearpublished,
        stats: {
          comments: 0,
          rating: {
            average: +gameData.statistics.ratings.average.value,
            bayesaverage: +gameData.statistics.ratings.bayesaverage.value,
            median: +gameData.statistics.ratings.median.value,
            stddev: +gameData.statistics.ratings.stddev.value,
            users: +gameData.statistics.ratings.usersrated.value,
            value: 0,
          },
          weight: 0,
        },
      };
    });

    return Object.values(notPlayedGamesMap);
  }

  private playPlayedTogether(play: BggPlay, users: BggUser[]) {
    const playPlayers = play.players.filter((player) => {
      return player.username !== undefined;
    });
    const userNames = users.map((user) => {
      return user.userName;
    });

    if (
      playPlayers.every((player) => {
        return userNames.includes(player.username);
      })
    ) {
      return true;
    }

    return false;
  }

  async compareCollection(userName: string, otherUserName: string) {
    const [user, otherUser] = await Promise.all([
      this.findOne(userName),
      this.findOne(otherUserName),
    ]);

    return this.getNotPlayedGamesForUser(user, otherUser);
  }
}
