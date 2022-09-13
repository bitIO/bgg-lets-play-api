import { Injectable } from '@nestjs/common';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlay,
  BggUser,
} from '../types';
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

  loadBggPlays?: (userName: string) => BggApiResponseDataPlay[];

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
    playsData: BggApiResponseDataPlay[],
  ) => void;

  async saveUser(userData: BggUser) {
    await this.store.saveUser(userData);
  }
}
