import { Injectable } from '@nestjs/common';
import { BggService } from '../bgg/bgg.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(private bgg: BggService) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(userName) {
    return this.bgg.getCollection(userName);
  }

  update(userName, updateCollectionDto: UpdateCollectionDto) {
    return `This action updates a #${userName} collection`;
  }

  remove(userName) {
    return `This action removes a #${userName} collection`;
  }
}
