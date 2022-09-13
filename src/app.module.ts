import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnxietyModule } from './anxiety/anxiety.module';
import { BggModule } from './bgg/bgg.module';
import { CacheModule } from './cache/cache.module';
import { CollectionModule } from './collection/collection.module';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';
import { GameModule } from './game/game.module';
import { PlaysModule } from './plays/plays.module';
import { ThingModule } from './thing/thing.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AnxietyModule,
    BggModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CollectionModule,
    CacheModule,
    DatabaseModule,
    EventModule,
    GameModule,
    PlaysModule,
    ThingModule,
    UserModule,
  ],
})
export class AppModule {}
