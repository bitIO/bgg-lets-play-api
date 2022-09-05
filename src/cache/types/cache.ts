import { BggUser } from '../../anxiety/types';
import {
  BggApiResponseDataCollection,
  BggAPIResponseDataGame,
  BggApiResponseDataPlays,
} from '../../bgg/types';

export interface BggCache {
  loadBggCollection?: (userName: string) => BggApiResponseDataCollection;
  loadBggGame?: (gameId: string) => BggAPIResponseDataGame;
  loadBggPlays?: (userName: string) => BggApiResponseDataPlays[];
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
    playsData: BggApiResponseDataPlays[],
  ) => void;
  saveUser: (userData: BggUser) => Promise<void>;
}
