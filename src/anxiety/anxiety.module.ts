import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { CacheModule } from '../cache/cache.module';
import { AnxietyController } from './anxiety.controller';
import { AnxietyService } from './anxiety.service';

@Module({
  controllers: [AnxietyController],
  imports: [CacheModule, BggModule],
  providers: [AnxietyService],
})
export class AnxietyModule {}
