import { BggCache } from '../types/cache';
import { CacheFile } from './file';
import { CacheLocal } from './memory';
import { CacheRedis } from './redis';

let cacheInstance: BggCache;

function getCacheStore() {
  if (!cacheInstance) {
    if (process.env.CACHE_TYPE === 'local') {
      cacheInstance = new CacheLocal();

      return cacheInstance;
    }

    if (process.env.CACHE_TYPE === 'file') {
      cacheInstance = new CacheFile(process.env.ROOT_PATH);

      return cacheInstance;
    }

    if (process.env.CACHE_TYPE === 'redis') {
      cacheInstance = new CacheRedis(+process.env.CACHE_TTL_IN_SECONDS);

      return cacheInstance;
    }
    throw new Error(`Invalid cache type: ${process.env.CACHE_TYPE}`);
  }

  return cacheInstance;
}

export * from './file';
export * from './memory';
export * from './redis';
export { getCacheStore };
