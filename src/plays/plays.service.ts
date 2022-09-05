import { Injectable } from '@nestjs/common';
import { BggService } from '../bgg/bgg.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';

@Injectable()
export class PlaysService {
  constructor(private bgg: BggService) {}

  create(createPlayDto: CreatePlayDto) {
    return 'This action adds a new play';
  }

  findAll() {
    return `This action returns all plays`;
  }

  findOne(userName: string) {
    return this.bgg.getPlays(userName);
  }

  update(userName: string, updatePlayDto: UpdatePlayDto) {
    return `This action updates a #${userName} play`;
  }

  remove(userName: string) {
    return `This action removes a #${userName} play`;
  }
}
