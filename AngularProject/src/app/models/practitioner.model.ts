export class Practitioner{
    displayName:string;
    discipline:string;
    id?:string;

    constructor(displayName:string, discipline:string, id?:string){
        this.displayName = displayName;
        this.discipline =   discipline;
        this.id= id;
    }
}