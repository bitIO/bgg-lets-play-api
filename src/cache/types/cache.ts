import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlay,
  BggUser,
} from '../../types';

export interface BggCache {
  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;
  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;
  loadBggPlays?: (userName: string) => BggApiResponseDataPlay[];
  loadUser: (userName: string) => Promise<BggUser>;
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
  saveUser: (userData: BggUser) => Promise<void>;
}
