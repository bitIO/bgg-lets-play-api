import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BggPlay } from '../types';
import { PlaysService } from './plays.service';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<BggPlay> {
    const play = await this.playsService.findById(id);

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
  }

  @Get()
  async find(): Promise<BggPlay[]> {
    const data = await this.playsService.find();

    return data.map((play) => {
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
    });
  }
}
