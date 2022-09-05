import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  controllers: [CollectionController],
  imports: [BggModule],
  providers: [CollectionService],
})
export class CollectionModule {}
