import Redis from 'ioredis';
import { BggUser } from '../../anxiety/types';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlays,
} from '../../bgg/types';
import { BggCache } from '../types';

class CacheRedis implements BggCache {
  private client: Redis;

  constructor(private ttlInSeconds: number = 3600) {
    console.log(
      'CACHE',
      `Creating redis connection to ${process.env.REDIS_URL}`,
    );
    console.log(
      'CACHE',
      `Redis connection ttl: ${process.env.CACHE_TTL_IN_SECONDS}`,
    );
    this.client = new Redis();
  }

  private generateKey(key: string) {
    return `${
      process.env.CACHE_NAMESPACE || 'anxiety'
    }:${key.toLocaleLowerCase()}`;
  }

  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;

  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;

  loadBggPlays?: (userName: string) => BggApiResponseDataPlays[];

  async loadUser(userName: string) {
    const data = await this.client.get(this.generateKey(userName));
    if (data) {
      return JSON.parse(data) as BggUser;
    }

    return null;
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
    await this.client.set(
      this.generateKey(userData.userName),
      JSON.stringify(userData),
      'EX',
      this.ttlInSeconds,
    );
  }
}

export { CacheRedis };
