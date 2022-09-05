import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userName')
  async findOne(@Param('userName') userName: string) {
    return this.userService.findOne(userName);
  }

  @Patch(':userName')
  update(
    @Param('userName') userName: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userName, updateUserDto);
  }

  @Delete(':userName')
  remove(@Param('userName') userName: string) {
    return this.userService.remove(userName);
  }
}
