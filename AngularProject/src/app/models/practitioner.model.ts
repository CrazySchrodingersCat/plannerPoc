export class Practitioner{
    displayName:string;
    discipline:string;
    id?:string;

    constructor(name:string, discipline:string, id?:string){
        this.displayName = name;
        this.discipline =   discipline;
        this.id= id;
    }
}