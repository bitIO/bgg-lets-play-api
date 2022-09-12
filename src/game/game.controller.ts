import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BggGame } from '../types';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BggGame> {
    const data = await this.gameService.findOneById(id);

    return {
      id: data.id,
      images: {
        image: data.images.image,
        thumbnail: data.images.thumbnail,
      },
      info: {
        maxPlayTime: data.info.maxPlayTime,
        maxPlayers: data.info.maxPlayers,
        minAge: data.info.minAge,
        minPlayTime: data.info.minPlayTime,
        minPlayers: data.info.minPlayers,
        playingTime: data.info.playingTime,
        weight: data.info.weight,
      },
      market: {
        owned: data.market.owned,
        trading: data.market.trading,
        wanting: data.market.wanting,
        whishing: data.market.whishing,
      },
      name: data.name,
      publishedYear: data.publishedYear,
      stats: {
        comments: data.info.comments,
        rating: {
          average: data.rating.average,
          bayesaverage: data.rating.bayesaverage,
          median: data.rating.median,
          stddev: data.rating.stddev,
          users: data.rating.users,
          value: data.rating.value,
        },
        weights: data.info.weights,
      },
    };
  }

  @Get()
  async find(): Promise<BggGame[]> {
    const games = await this.gameService.findAll();

    return games.map((game) => {
      return {
        id: game.id,
        images: {
          image: game.images.image,
          thumbnail: game.images.thumbnail,
        },
        info: {
          maxPlayTime: game.info.maxPlayTime,
          maxPlayers: game.info.maxPlayers,
          minAge: game.info.minAge,
          minPlayTime: game.info.minPlayTime,
          minPlayers: game.info.minPlayers,
          playingTime: game.info.playingTime,
          weight: game.info.weight,
        },
        market: {
          owned: game.market.owned,
          trading: game.market.trading,
          wanting: game.market.wanting,
          whishing: game.market.whishing,
        },
        name: game.name,
        publishedYear: game.publishedYear,
        stats: {
          comments: game.info.comments,
          rating: {
            average: game.rating.average,
            bayesaverage: game.rating.bayesaverage,
            median: game.rating.median,
            stddev: game.rating.stddev,
            users: game.rating.users,
            value: game.rating.value,
          },
          weights: game.info.weights,
        },
      };
    });
  }
}
