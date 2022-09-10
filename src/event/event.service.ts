import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { AlreadyCreatedError } from '../database/types';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private db: DatabaseService) {}

  async create(createEventDto: CreateEventDto) {
    try {
      const event = await this.db.event.create({
        data: {
          ...createEventDto,
        },
      });

      return event;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyCreatedError(error.code, error.message);
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.db.event.findMany();
  }

  findOneById(id: number) {
    return this.db.event.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByKeys(location: string, name: string, startsAt: Date) {
    return this.db.event.findUnique({
      where: {
        name_location_startsAt: {
          location,
          name,
          startsAt,
        },
      },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.db.event.update({
      data: {
        ...updateEventDto,
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.db.event.delete({
      where: {
        id,
      },
    });
  }
}
