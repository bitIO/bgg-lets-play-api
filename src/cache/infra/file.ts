import { addSeconds, isAfter } from 'date-fns';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlay,
  BggUser,
} from '../../types';
import { BggCache } from '../types';

class CacheFile implements BggCache {
  constructor(private rootPath = '/tmp/bgg/anxiety') {
    if (!existsSync(rootPath)) {
      mkdirSync(rootPath, {
        recursive: true,
      });
    }
  }

  private saveContent<TItem>(json: TItem, userName: string, path: string = '') {
    writeFileSync(join(this.rootPath, path, userName), JSON.stringify(json));
  }

  private loadContent<TItem>(userName: string, path: string = '') {
    const filePath = join(this.rootPath, path, userName);
    if (!existsSync(filePath)) {
      return null;
    }
    const { mtime } = statSync(filePath);
    const fileTime = addSeconds(mtime, +process.env.CACHE_TTL_IN_SECONDS);
    if (isAfter(Date.now(), fileTime)) {
      return null;
    }

    return JSON.parse(readFileSync(filePath).toString()) as TItem;
  }

  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;

  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;

  loadBggPlays?: (userName: string) => BggApiResponseDataPlay[];

  async loadUser(userName: string) {
    return this.loadContent<BggUser>(userName);
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
    this.saveContent<BggUser>(userData, userData.userName);
  }
}

export { CacheFile };
