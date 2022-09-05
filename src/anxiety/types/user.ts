import { BggCollection } from './collection';
import { BggPlay } from './play';

export interface BggUser {
  avatar?: string;
  collection?: BggCollection;
  firstName: string;
  id: number;
  lastName: string;
  plays?: BggPlay[];
  userName: string;
}
