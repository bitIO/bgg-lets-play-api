import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { PlaysService } from './plays.service';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post()
  create(@Body() createPlayDto: CreatePlayDto) {
    return this.playsService.create(createPlayDto);
  }

  @Get()
  findAll() {
    return this.playsService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string) {
    return this.playsService.findOne(userName);
  }

  @Patch(':userName')
  update(
    @Param('userName') userName: string,
    @Body() updatePlayDto: UpdatePlayDto,
  ) {
    return this.playsService.update(userName, updatePlayDto);
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string) {
    return this.playsService.remove(userName);
  }
}
