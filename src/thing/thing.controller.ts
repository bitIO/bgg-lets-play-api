import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateThingDto } from './dto/create-thing.dto';
import { UpdateThingDto } from './dto/update-thing.dto';
import { ThingService } from './thing.service';

@Controller('thing')
export class ThingController {
  constructor(private readonly thingService: ThingService) {}

  @Post()
  create(@Body() createThingDto: CreateThingDto) {
    return this.thingService.create(createThingDto);
  }

  @Get()
  findAll() {
    return this.thingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThingDto: UpdateThingDto) {
    return this.thingService.update(+id, updateThingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thingService.remove(+id);
  }
}
