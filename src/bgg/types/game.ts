import { ValueObject } from './common';

export interface BggAPIResponseDataGame {
  item: BggAPIResponseDataGameItem | BggAPIResponseDataGameItem[];
  termsofuse: string;
}

export interface BggAPIResponseDataGameItem {
  description: string;
  id: string;
  image: string;
  link: BggAPIResponseDataGameItemLink[];
  maxplayers: ValueObject;
  maxplaytime: ValueObject;
  minage: ValueObject;
  minplayers: ValueObject;
  minplaytime: ValueObject;
  name: BggAPIResponseDataGameItemName | BggAPIResponseDataGameItemName[];
  playingtime: ValueObject;
  poll: BggAPIResponseDataGameItemPoll[];
  statistics: BggAPIResponseDataGameStats;
  thumbnail: string;
  type: string;
  yearpublished: ValueObject;
}

export interface BggAPIResponseDataGameItemLink {
  id: string;
  inbound?: string;
  type: string;
  value: string;
}

export interface BggAPIResponseDataGameItemName {
  sortindex: string;
  type: BggAPIResponseDataGameItemNameType;
  value: string;
}

export interface BggAPIResponseDataGameItemPoll {
  name: string;
  results: BggAPIResponseDataGameItemPollResult;
  title: string;
  totalvotes: string;
}

export interface BggAPIResponseDataGameItemPollResult {
  numplayers?: string;
  result: BggAPIResponseDataGameItemPollResultItem[];
}

export interface BggAPIResponseDataGameItemPollResultItem {
  level?: string;
  numvotes: string;
  value: string;
}

export interface BggAPIResponseDataGameStats {
  page: string;
  ratings: BggAPIResponseDataGameStatsRatings;
}

export interface BggAPIResponseDataGameStatsRatings {
  average: ValueObject;
  averageweight: ValueObject;
  bayesaverage: ValueObject;
  median: ValueObject;
  numcomments: ValueObject;
  numweights: ValueObject;
  owned: ValueObject;
  ranks: BggAPIResponseDataGameStatsRatingsRanks;
  stddev: ValueObject;
  trading: ValueObject;
  usersrated: ValueObject;
  wanting: ValueObject;
  wishing: ValueObject;
}

export interface BggAPIResponseDataGameStatsRatingsRanks {
  rank: BggAPIResponseDataGameStatsRatingsRanksItem[];
}

export interface BggAPIResponseDataGameStatsRatingsRanksItem {
  bayesaverage: string;
  friendlyname: string;
  id: string;
  name: string;
  type: string;
  value: string;
}

export enum BggAPIResponseDataGameItemNameType {
  Alternate = 'alternate',
  Primary = 'primary',
}
