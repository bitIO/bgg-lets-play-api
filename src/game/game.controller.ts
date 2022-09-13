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
        image: data.GameImage.image,
        thumbnail: data.GameImage.thumbnail,
      },
      info: {
        maxPlayTime: data.GameInfo.maxPlayTime,
        maxPlayers: data.GameInfo.maxPlayers,
        minAge: data.GameInfo.minAge,
        minPlayTime: data.GameInfo.minPlayTime,
        minPlayers: data.GameInfo.minPlayers,
        playingTime: data.GameInfo.playingTime,
        weight: data.GameInfo.weight,
      },
      market: {
        owned: data.GameMarket.owned,
        trading: data.GameMarket.trading,
        wanting: data.GameMarket.wanting,
        whishing: data.GameMarket.whishing,
      },
      name: data.name,
      publishedYear: data.publishedYear,
      stats: {
        comments: data.GameInfo.comments,
        rating: {
          average: data.GameRating.average,
          bayesaverage: data.GameRating.bayesaverage,
          median: data.GameRating.median,
          stddev: data.GameRating.stddev,
          users: data.GameRating.users,
          value: data.GameRating.value,
        },
        weights: data.GameInfo.weights,
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
          image: game.GameImage.image,
          thumbnail: game.GameImage.thumbnail,
        },
        info: {
          maxPlayTime: game.GameInfo.maxPlayTime,
          maxPlayers: game.GameInfo.maxPlayers,
          minAge: game.GameInfo.minAge,
          minPlayTime: game.GameInfo.minPlayTime,
          minPlayers: game.GameInfo.minPlayers,
          playingTime: game.GameInfo.playingTime,
          weight: game.GameInfo.weight,
        },
        market: {
          owned: game.GameMarket.owned,
          trading: game.GameMarket.trading,
          wanting: game.GameMarket.wanting,
          whishing: game.GameMarket.whishing,
        },
        name: game.name,
        publishedYear: game.publishedYear,
        stats: {
          comments: game.GameInfo.comments,
          rating: {
            average: game.GameRating.average,
            bayesaverage: game.GameRating.bayesaverage,
            median: game.GameRating.median,
            stddev: game.GameRating.stddev,
            users: game.GameRating.users,
            value: game.GameRating.value,
          },
          weights: game.GameInfo.weights,
        },
      };
    });
  }
}
