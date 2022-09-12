import { ValueObject } from './common';

export interface BggApiResponseDataUser {
  avatarlink: ValueObject;
  battlenetaccount: ValueObject;
  country: ValueObject;
  firstname: ValueObject;
  id: string;
  lastlogin: ValueObject;
  lastname: ValueObject;
  marketrating: ValueObject;
  name: string;
  psnaccount: ValueObject;
  stateorprovince: ValueObject;
  steamaccount: ValueObject;
  termsofuse: string;
  traderating: ValueObject;
  webaddress: ValueObject;
  wiiaccount: ValueObject;
  xboxaccount: ValueObject;
  yearregistered: ValueObject;
}
