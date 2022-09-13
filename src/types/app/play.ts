import { BggGame } from './game';

export interface BggPlay {
  date: Date;
  game: BggGame;
  id: number;
  length: number;
  location: string;
  players: BggPlayPlayer[];
  quantity: number;
}

export interface BggPlayPlayer {
  color?: string;
  name?: string;
  new?: boolean;
  rating?: string;
  score?: string;
  startposition?: string;
  userid?: number;
  username?: string;
  win?: boolean;
}
