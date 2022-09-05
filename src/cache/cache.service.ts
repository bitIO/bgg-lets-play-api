import { Injectable } from '@nestjs/common';
import { BggUser } from '../anxiety/types';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlays,
} from '../bgg/types';
import { getCacheStore } from './infra';
import { BggCache } from './types';

@Injectable()
export class CacheService implements BggCache {
  private store: BggCache;

  constructor() {
    this.store = getCacheStore();
  }

  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;

  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;

  loadBggPlays?: (userName: string) => BggApiResponseDataPlays[];

  loadUser(userName: string) {
    return this.store.loadUser(userName);
  }

  saveBggCollection?: (
    userName: string,
    collectionData: BggApiResponseDataCollection,
  ) => void;

  saveBggGames?: (
    userName: string,
    gamesData: BggAPIResponseDataGame[],
  ) => void;

  saveBggPlays?: (
    userName: string,
    playsData: BggApiResponseDataPlays[],
  ) => void;

  async saveUser(userData: BggUser) {
    await this.store.saveUser(userData);
  }
}
