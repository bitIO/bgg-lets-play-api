import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { GameService } from './game.service';

@Module({
  exports: [GameService],
  imports: [BggModule],
  providers: [GameService],
})
export class GameModule {}
