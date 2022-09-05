import { Injectable } from '@nestjs/common';
import {
  getBggCollection,
  getBggPlays,
  getBggThing,
  getBggUser,
} from 'bgg-xml-api-client';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlays,
  BggApiResponseDataUser,
} from './types';

@Injectable()
export class BggService {
  async getUser(userName: string) {
    const { data } = await getBggUser({
      name: userName,
    });

    return data as BggApiResponseDataUser;
  }

  async getCollection(userName: string) {
    const { data } = await getBggCollection({
      stats: 1,
      username: userName,
    });

    return data as BggApiResponseDataCollection;
  }

  async getPlays(userName: string) {
    const response = await getBggPlays({
      page: 1,
      username: userName,
    });

    const data: BggApiResponseDataPlays[] = [];
    const responseData = response.data as BggApiResponseDataPlays;
    data.push(responseData);

    const total = +responseData.total;
    if (total - 100 > 0) {
      const remainingPages = Math.ceil((total - 100) / 100);
      const promises = [];
      for (let index = 0; index < remainingPages; index += 1) {
        promises.push(
          getBggPlays({
            page: index + 2,
            username: userName,
          }),
        );
      }
      const remainingPagesResponseData = await Promise.all(promises);
      remainingPagesResponseData.forEach((pageResponseData) => {
        data.push(pageResponseData.data);
      });
    }

    return data;
  }

  async getGamesInfo(ids: number[]) {
    const { data } = await getBggThing({
      id: ids,
      stats: 1,
    });

    return data as BggAPIResponseDataGame;
  }
}
