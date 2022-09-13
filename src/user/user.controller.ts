import { Controller, Get, Param } from '@nestjs/common';
import { BggUser } from '../types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userName')
  async findOne(@Param('userName') userName: string): Promise<BggUser> {
    const dbUser = await this.userService.findOneOrSync(userName);

    return {
      avatar: dbUser.avatar,
      collection: dbUser.UserCollection.map((item) => {
        const gameStatus = dbUser.UserGameStatus.find((userGameStatus) => {
          return userGameStatus.id === item.Game.id;
        });

        return {
          id: item.gameId,
          images: {
            image: item.Game.GameImage.image,
            thumbnail: item.Game.GameImage.thumbnail,
          },
          info: {
            maxPlayTime: item.Game.GameInfo.maxPlayTime,
            maxPlayers: item.Game.GameInfo.maxPlayers,
            minAge: item.Game.GameInfo.minAge,
            minPlayTime: item.Game.GameInfo.minPlayTime,
            minPlayers: item.Game.GameInfo.minPlayers,
            playingTime: item.Game.GameInfo.playingTime,
            weight: item.Game.GameInfo.weight,
          },
          market: {
            owned: item.Game.GameMarket.owned,
            trading: item.Game.GameMarket.trading,
            wanting: item.Game.GameMarket.wanting,
            whishing: item.Game.GameMarket.whishing,
          },
          name: item.Game.name,
          publishedYear: item.Game.publishedYear,
          stats: {
            comments: item.Game.GameInfo.comments,
            rating: {
              average: item.Game.GameRating.average,
              bayesaverage: item.Game.GameRating.bayesaverage,
              median: item.Game.GameRating.median,
              stddev: item.Game.GameRating.stddev,
              users: item.Game.GameRating.users,
              value: item.Game.GameRating.value,
            },
            weights: item.Game.GameInfo.weights,
          },
          status: {
            fortrade: gameStatus ? gameStatus.fortrade : false,
            own: gameStatus ? gameStatus.own : false,
            preordered: gameStatus ? gameStatus.preordered : false,
            prevowned: gameStatus ? gameStatus.prevowned : false,
            want: gameStatus ? gameStatus.want : false,
            wanttobuy: gameStatus ? gameStatus.wanttobuy : false,
            wanttoplay: gameStatus ? gameStatus.wanttoplay : false,
            wishlist: gameStatus ? gameStatus.wishlist : false,
          },
        };
      }),
      firstName: dbUser.firstName,
      id: dbUser.id,
      lastName: dbUser.lastName,
      plays: dbUser.Plays.map((play) => {
        return {
          date: play.date,
          game: {
            id: play.Game.id,
            name: play.Game.name,
          },
          id: play.id,
          length: play.length,
          location: play.location,
          players: play.Players.map((player) => {
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
