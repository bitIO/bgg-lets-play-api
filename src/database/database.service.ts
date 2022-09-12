import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.event.deleteMany(),
      this.game.deleteMany(),
      this.gameImage.deleteMany(),
      this.gameMarket.deleteMany(),
      this.gameRating.deleteMany(),
      this.play.deleteMany(),
      this.playPlayer.deleteMany(),
      this.user.deleteMany(),
      this.userCollection.deleteMany(),
      this.userEvents.deleteMany(),
      this.userGameStatus.deleteMany(),
    ]);
  }
}
