import {IUser} from './IUser.model';

export class Client implements IUser{
  displayName: string;
  id?: string;

  constructor(displayName: string, id?: string) {
    this.displayName = displayName;
    this.id = id;
  }
}
