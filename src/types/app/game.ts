export interface BggGame {
  id: number;
  images?: BggGameImage;
  info?: BggGameInfo;
  market?: BggGameMarket;
  name: string;
  plays?: number;
  publishedYear?: number;
  stats?: BggGameStats;
  status?: BggGameStatus;
}

export interface BggGameInfo {
  maxPlayTime: number;
  maxPlayers: number;
  minAge: number;
  minPlayTime: number;
  minPlayers: number;
  playingTime: number;
  weight: number;
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
  weights: number;
}

export interface BggGameStatus {
  fortrade: boolean;
  own: boolean;
  preordered: boolean;
  prevowned: boolean;
  want: boolean;
  wanttobuy: boolean;
  wanttoplay: boolean;
  wishlist: boolean;
}
