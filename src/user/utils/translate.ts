import { BggUser } from '../../anxiety/types';
import { BggApiResponseDataUser } from '../../bgg/types';

export function translateResponse(data: BggApiResponseDataUser): BggUser {
  return {
    avatar: data.avatarlink.value,
    collection: [],
    firstName: data.firstname.value,
    id: +data.id,
    lastName: data.lastname.value,
    plays: [],
    userName: data.name,
  };
}
