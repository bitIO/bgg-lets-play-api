import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { GameModule } from '../game/game.module';
import { PlaysModule } from '../plays/plays.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [BggModule, GameModule, PlaysModule],
  providers: [UserService],
})
export class UserModule {}
