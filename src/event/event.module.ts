import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  imports: [UserModule],
  providers: [EventService],
})
export class EventModule {}
