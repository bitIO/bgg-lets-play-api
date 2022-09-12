import { Injectable, Logger } from '@nestjs/common';
import { Game } from '@prisma/client';
import { BggService } from '../bgg/bgg.service';
import { DatabaseService } from '../database/database.service';
import { BggAPIResponseDataGame, BggAPIResponseDataGameItem } from '../types';

const defaultImage =
  'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const defaultThumbnail =
  'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=75';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  constructor(private bgg: BggService, private database: DatabaseService) {}

  private async upsertGamesInfo(
    item: BggAPIResponseDataGameItem,
  ): Promise<Game> {
    const gameName = Array.isArray(item.name)
      ? item.name.find((name) => {
          return name.type === 'primary';
        }).value || item.name[0].value
      : item.name.value;
    try {
      const id = +item.id;

      const [image, info, market, rating] = await Promise.all([
        this.database.gameImage.upsert({
          create: {
            id,
            image: item.image || defaultImage,
            thumbnail: item.thumbnail || defaultThumbnail,
          },
          update: {
            image: item.image || defaultImage,
            thumbnail: item.thumbnail || defaultThumbnail,
          },
          where: {
            id,
          },
        }),

        this.database.gameInfo.upsert({
          create: {
            comments: +item.statistics.ratings.numcomments.value,
            description: item.description,
            id,
            maxPlayTime: +item.maxplaytime.value,
            maxPlayers: +item.maxplayers.value,
            minAge: +item.minage.value,
            minPlayTime: +item.minplaytime.value,
            minPlayers: +item.minplayers.value,
            playingTime: +item.playingtime.value,
            weight: +item.statistics.ratings.averageweight.value,
            weights: +item.statistics.ratings.numweights.value,
          },
          update: {
            comments: +item.statistics.ratings.numcomments.value,
            description: item.description,
            maxPlayTime: +item.maxplaytime.value,
            maxPlayers: +item.maxplayers.value,
            minAge: +item.minage.value,
            minPlayTime: +item.minplaytime.value,
            minPlayers: +item.minplayers.value,
            playingTime: +item.playingtime.value,
            weight: +item.statistics.ratings.averageweight.value,
            weights: +item.statistics.ratings.numweights.value,
          },
          where: {
            id,
          },
        }),

        this.database.gameMarket.upsert({
          create: {
            id,
            owned: +item.statistics.ratings.owned.value,
            trading: +item.statistics.ratings.trading.value,
            wanting: +item.statistics.ratings.wanting.value,
            whishing: +item.statistics.ratings.wishing.value,
          },
          update: {
            owned: +item.statistics.ratings.owned.value,
            trading: +item.statistics.ratings.trading.value,
            wanting: +item.statistics.ratings.wanting.value,
            whishing: +item.statistics.ratings.wishing.value,
          },
          where: {
            id,
          },
        }),

        this.database.gameRating.upsert({
          create: {
            average: +item.statistics.ratings.average.value,
            bayesaverage: +item.statistics.ratings.bayesaverage.value,
            id,
            median: +item.statistics.ratings.median.value,
            stddev: +item.statistics.ratings.stddev.value,
            users: +item.statistics.ratings.usersrated.value,
            value: 0,
          },
          update: {
            average: +item.statistics.ratings.average.value,
            bayesaverage: +item.statistics.ratings.bayesaverage.value,
            median: +item.statistics.ratings.median.value,
            stddev: +item.statistics.ratings.stddev.value,
            users: +item.statistics.ratings.usersrated.value,
            value: 0,
          },
          where: {
            id,
          },
        }),
      ]);
      const gameRecord = this.database.game.upsert({
        create: {
          gameImageId: image.id,
          gameInfoId: info.id,
          gameMarketId: market.id,
          gameRatingId: rating.id,
          id,
          name: gameName,
          publishedYear: +item.yearpublished.value,
        },
        update: {
          gameImageId: image.id,
          gameInfoId: info.id,
          gameMarketId: market.id,
          gameRatingId: rating.id,
          name: gameName,
          publishedYear: +item.yearpublished.value,
        },
        where: {
          id,
        },
      });

      return await gameRecord;
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(`Game: ${gameName} / #${item.id}`);
      throw error;
    }
  }

  async updateGamesInfo(bggResponseGames: BggAPIResponseDataGame) {
    const gamesInfo = Array.isArray(bggResponseGames.item)
      ? bggResponseGames.item
      : [bggResponseGames.item];

    const upsert = [];
    gamesInfo.forEach((gameInfo) => {
      upsert.push(this.upsertGamesInfo(gameInfo));
    });

    return Promise.all<Game[]>(upsert);
  }

  async retrieveAndUpdateGamesInfo(gameIds: number[]) {
    const bggResponseGames = await this.bgg.getGamesInfo(gameIds);

    return this.updateGamesInfo(bggResponseGames);
  }
}
