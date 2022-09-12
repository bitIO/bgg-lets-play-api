import { ValueObject } from './common';

export interface BggApiResponseDataPlay {
  page: string;
  play: BggApiResponseDataPlayItem[];
  termsofuse: string;
  total: string;
  userid: string;
  username: string;
}

export interface BggApiResponseDataPlayItem {
  date: string;
  id: string;
  incomplete: string;
  item: BggApiResponseDataPlaysItemGame;
  length: string;
  location: string;
  players: {
    player:
      | BggApiResponseDataPlaysItemPlayer
      | BggApiResponseDataPlaysItemPlayer[];
  };
  quantity: string;
}

export interface BggApiResponseDataPlaysItemGame {
  name: string;
  objectid: string;
  objecttype: string;
  subtypes: {
    subtype: ValueObject;
  };
}

export interface BggApiResponseDataPlaysItemPlayer {
  color: string;
  name: string;
  new: string;
  rating: string;
  score: string;
  startposition: string;
  userid: string;
  username: string;
  win: string;
}
