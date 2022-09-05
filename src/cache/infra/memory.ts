import { addHours, isAfter } from 'date-fns';
import { BggUser } from '../../anxiety/types';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlays,
} from '../../bgg/types';
import { BggCache } from '../types/cache';

interface CacheStore {
  user: {
    [key: string]: {
      data: BggUser;
      stored: Date;
    };
  };
}

class CacheLocal implements BggCache {
  private store: CacheStore;

  private expirationHours = 1;

  constructor() {
    this.store = {
      user: {},
    };
  }

  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;

  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;

  loadBggPlays?: (userName: string) => BggApiResponseDataPlays[];

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

  async loadUser(userName: string) {
    if (!this.store.user[userName]) {
      return null;
    }

    const { data, stored } = this.store.user[userName];
    if (isAfter(new Date(), addHours(stored, 1))) {
      return null;
    }

    return data;
  }

  async saveUser(userData: BggUser) {
    this.store.user[userData.userName] = {
      data: userData,
      stored: new Date(),
    };
  }
}

export { CacheLocal };
