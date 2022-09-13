import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BggService } from '../bgg/bgg.service';
import { DatabaseService } from '../database/database.service';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CollectionService {
  private readonly logger = new Logger(CollectionService.name);

  constructor(
    private config: ConfigService,
    private bgg: BggService,
    private database: DatabaseService,
    private game: GameService,
    private user: UserService,
  ) {}
}
