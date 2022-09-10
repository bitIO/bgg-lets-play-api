import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BggService } from '../bgg/bgg.service';
import { DatabaseService } from '../database/database.service';
import { isExpired } from '../utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private bgg: BggService,
    private database: DatabaseService,
    private config: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto :>> ', createUserDto);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(userName: string) {
    this.logger.debug('request user info', {
      userName,
    });
    const user = await this.database.user.findUnique({
      where: {
        userName,
      },
    });

    if (
      user &&
      !isExpired(
        user.updatedAt,
        +this.config.getOrThrow('CACHE_TTL_IN_SECONDS'),
      )
    ) {
      return user;
    }

    const response = await this.bgg.getUser(userName);
    const dbUser = await this.database.user.upsert({
      create: {
        firstName: response.firstname.value,
        id: +response.id,
        lastName: response.lastname.value,
        userName: response.name,
      },
      update: {
        firstName: response.firstname.value,
        id: +response.id,
        lastName: response.lastname.value,
        userName: response.name,
      },
      where: {
        userName,
      },
    });

    return dbUser;
  }

  update(userName: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto :>> ', updateUserDto);

    return `This action updates a #${userName} user`;
  }

  remove(userName: string) {
    return this.database.user.delete({
      where: {
        userName,
      },
    });
  }
}
