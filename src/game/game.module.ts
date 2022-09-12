import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  exports: [GameService],
  imports: [BggModule],
  providers: [GameService],
})
export class GameModule {}
