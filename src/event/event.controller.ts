import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DatabaseError } from '../database/types/error/DatabaseError';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const event = await this.eventService.create(createEventDto);

      return event;
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw new BadRequestException(error);
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOneById(+id);
  }

  @Get(':name/:location/:startsAt')
  findOneByKeys(
    @Param('name') name: string,
    @Param('location') location: string,
    @Param('startsAt') startsAt: Date,
  ) {
    return this.eventService.findOneByKeys(location, name, startsAt);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
