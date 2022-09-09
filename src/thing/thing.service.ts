import { Injectable } from '@nestjs/common';
import { CreateThingDto } from './dto/create-thing.dto';
import { UpdateThingDto } from './dto/update-thing.dto';

@Injectable()
export class ThingService {
  create(createThingDto: CreateThingDto) {
    console.log('createThingDto :>> ', createThingDto);

    return 'This action adds a new thing';
  }

  findAll() {
    return `This action returns all thing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thing`;
  }

  update(id: number, updateThingDto: UpdateThingDto) {
    console.log('updateThingDto :>> ', updateThingDto);

    return `This action updates a #${id} thing`;
  }

  remove(id: number) {
    return `This action removes a #${id} thing`;
  }
}
