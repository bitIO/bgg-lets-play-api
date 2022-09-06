import { BggGame } from './game';
import { BggPlay } from './play';

export interface BggUser {
  avatar?: string;
  collection: BggGame[];
  firstName: string;
  id: number;
  lastName: string;
  plays?: BggPlay[];
  userName: string;
}
