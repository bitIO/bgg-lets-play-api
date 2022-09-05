import { Module } from '@nestjs/common';
import { BggService } from './bgg.service';

@Module({
  exports: [BggService],
  providers: [BggService],
})
export class BggModule {}
