import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { GameModule } from '../game/game.module';
import { UserModule } from '../user/user.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  controllers: [CollectionController],
  imports: [BggModule, UserModule, GameModule],
  providers: [CollectionService],
})
export class CollectionModule {}
