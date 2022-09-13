import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { AlreadyCreatedError } from '../database/types';
import { UserService } from '../user/user.service';
import { CreateEventDto } from './dto/CreateEvent.dto';
import { UpdateEventDto } from './dto/UpdateEvent.dto';

@Injectable()
export class EventService {
  constructor(private db: DatabaseService, private users: UserService) {}

  async create(dto: CreateEventDto) {
    try {
      const event = await this.db.event.create({
        data: {
          coordinates: dto.coordinates,
          description: dto.description,
          endsAt: dto.endsAt,
          location: dto.location,
          name: dto.name,
          nomBggUser: dto.nonBggUsers as unknown as Prisma.JsonArray,
          startsAt: dto.startsAt,
        },
      });

      const users = await Promise.all(
        dto.bggUsers.map((bggUser) => {
          return this.users.findOneOrSync(bggUser);
        }),
      );
      await Promise.all(
        users.map((user) => {
          return this.db.eventsUsers.create({
            data: {
              eventId: event.id,
              userId: user.id,
            },
          });
        }),
      );

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
