import { Module } from '@nestjs/common';
import { BggModule } from '../bgg/bgg.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [BggModule],
  providers: [UserService],
})
export class UserModule {}
