import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BggModule } from './bgg/bgg.module';
import { CollectionModule } from './collection/collection.module';
import { PlaysModule } from './plays/plays.module';
import { ThingModule } from './thing/thing.module';
import { UserModule } from './user/user.module';
import { AnxietyModule } from './anxiety/anxiety.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BggModule,
    CollectionModule,
    PlaysModule,
    ThingModule,
    UserModule,
    AnxietyModule,
    CacheModule,
  ],
})
export class AppModule {}
