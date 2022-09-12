import { Controller, Get, Param } from '@nestjs/common';
import { BggUser } from '../types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userName')
  async findOne(@Param('userName') userName: string): Promise<BggUser> {
    const dbUser = await this.userService.findOne(userName);

    return {
      avatar: dbUser.avatar,
      collection: dbUser.UserCollection.map((item) => {
        return {
          id: item.gameId,
          images: {
            image: item.game.images.image,
            thumbnail: item.game.images.thumbnail,
          },
          info: {
            maxPlayTime: item.game.info.maxPlayTime,
            maxPlayers: item.game.info.maxPlayers,
            minAge: item.game.info.minAge,
            minPlayTime: item.game.info.minPlayTime,
            minPlayers: item.game.info.minPlayers,
            playingTime: item.game.info.playingTime,
            weight: item.game.info.weight,
          },
          market: {
            owned: item.game.market.owned,
            trading: item.game.market.trading,
            wanting: item.game.market.wanting,
            whishing: item.game.market.whishing,
          },
          name: item.game.name,
          publishedYear: item.game.publishedYear,
          stats: {
            comments: item.game.info.comments,
            rating: {
              average: item.game.rating.average,
              bayesaverage: item.game.rating.bayesaverage,
              median: item.game.rating.median,
              stddev: item.game.rating.stddev,
              users: item.game.rating.users,
              value: item.game.rating.value,
            },
            weights: item.game.info.weights,
          },
        };
      }),
      firstName: dbUser.firstName,
      id: dbUser.id,
      lastName: dbUser.lastName,
      plays: dbUser.plays.map((play) => {
        return {
          date: play.date,
          game: {
            id: play.game.id,
            name: play.game.name,
          },
          id: play.id,
          length: play.length,
          location: play.location,
          players: play.players.map((player) => {
            return {
              color: player.color,
              name: player.name,
              new: player.new,
              rating: player.rating,
              score: player.score,
              startposition: player.startposition,
              username: player.username,
              win: player.win,
            };
          }),
          quantity: play.quantity,
        };
      }),
      userName: dbUser.userName,
    };
  }
}
