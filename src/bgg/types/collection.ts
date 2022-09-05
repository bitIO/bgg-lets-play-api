export interface BggApiResponseDataCollection {
  item: BggApiResponseDataCollectionItem[];
  pubdate: string;
  termsofuse: string;
  totalitems: string;
}

export interface BggApiResponseDataCollectionItem {
  collid: string;
  image: string;
  name: BggApiResponseDataCollectionItemName;
  numplays: number;
  objectid: string;
  objecttype: string;
  stats: BggApiResponseDataCollectionItemStats;
  status: BggApiResponseDataCollectionItemStatus;
  subtype: string;
  thumbnail: string;
  yearpublished: number;
}

export interface BggApiResponseDataCollectionItemName {
  sortindex: string;
  text: string;
}

export interface BggApiResponseDataCollectionItemStatus {
  fortrade: string;
  lastmodified: string;
  own: string;
  preordered: string;
  prevowned: string;
  want: string;
  wanttobuy: string;
  wanttoplay: string;
  wishlist: string;
}

export interface BggApiResponseDataCollectionItemStats {
  maxplayers: string;
  maxplaytime: string;
  minplayers: string;
  minplaytime: string;
  numowned: string;
  playingtime: string;
  rating: {
    average: {
      value: string;
    };
    bayesaverage: {
      value: string;
    };
    median: {
      value: string;
    };
    stddev: {
      value: string;
    };
    usersrated: {
      value: string;
    };
    value: string;
  };
}
