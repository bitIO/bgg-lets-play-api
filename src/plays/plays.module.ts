import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { PlaysController } from './plays.controller';
import { PlaysService } from './plays.service';

@Module({
  controllers: [PlaysController],
  exports: [PlaysService],
  imports: [BggModule],
  providers: [PlaysService],
})
export class PlaysModule {}
