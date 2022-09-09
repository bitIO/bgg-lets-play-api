import { Injectable } from '@nestjs/common';
import { BggService } from '../bgg/bgg.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private bgg: BggService) {}

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto :>> ', createUserDto);

    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(userName: string) {
    return this.bgg.getUser(userName);
  }

  update(userName: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto :>> ', updateUserDto);

    return `This action updates a #${userName} user`;
  }

  remove(userName: string) {
    return `This action removes a #${userName} user`;
  }
}
