import { BggGame } from './game';

export interface BggCollection {
  games: BggGame[];
  publicationDate: Date;
  totalItems: number;
}
