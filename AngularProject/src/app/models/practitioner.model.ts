import { IUser } from "./IUser.model";

export class Practitioner implements IUser{
    displayName:string;
    discipline:string;
    id?:string;
    userType:string;
    

    constructor(displayName:string, discipline:string, id?:string){
        this.displayName = displayName;
        this.discipline =   discipline;
        this.id= id;
        this.userType = discipline;
    }
}