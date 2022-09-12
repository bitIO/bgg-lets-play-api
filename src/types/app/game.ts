export interface BggGame {
  id: number;
  images?: BggGameImage;
  info?: BggGameInfo;
  market?: BggGameMarket;
  name: string;
  plays?: number;
  publishedYear?: number;
  stats?: BggGameStats;
}

export interface BggGameInfo {
  maxPlayTime: number;
  maxPlayers: number;
  minPlayTime: number;
  minPlayers: number;
  numOwners: number;
  playingTime: number;
}

export interface BggGameImage {
  image: string;
  thumbnail: string;
}

export interface BggGameMarket {
  owned: number;
  trading: number;
  wanting: number;
  whishing: number;
}

export interface BggGameRating {
  average: number;
  bayesaverage: number;
  median: number;
  stddev: number;
  users: number;
  value: number;
}

export interface BggGameStats {
  comments: number;
  rating: BggGameRating;
  weight: {
    avg: number;
    votes: number;
  };
}

export interface BggGameStatus {
  fortrade: boolean;
  lastmodified: '2020-12-24 19:28:17';
  own: boolean;
  preordered: boolean;
  prevowned: boolean;
  want: boolean;
  wanttobuy: boolean;
  wanttoplay: boolean;
  wishlist: boolean;
}
