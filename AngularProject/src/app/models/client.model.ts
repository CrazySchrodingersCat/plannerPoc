import {IUser} from './IUser.model';

export class Client implements IUser {
  displayName: string;
  id?: string;
  userType: string;
  isHidden?: boolean =false;

  constructor(displayName: string, id?: string) {
    this.displayName = displayName;
    this.id = id;
    this.userType ='client';
  }
}
