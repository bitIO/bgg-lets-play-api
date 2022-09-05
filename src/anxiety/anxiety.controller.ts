import { Controller, Get, Param } from '@nestjs/common';
import { AnxietyService } from './anxiety.service';

@Controller('anxiety')
export class AnxietyController {
  constructor(private readonly anxietyService: AnxietyService) {}

  @Get(':userName')
  getUser(@Param('userName') userName: string) {
    return this.anxietyService.findOne(userName);
  }

  @Get(':userName/vs/:otherUserName')
  compareCollection(
    @Param('userName') userName: string,
    @Param('otherUserName') otherUserName: string,
  ) {
    return this.anxietyService.compareCollection(userName, otherUserName);
  }
}
