export class Practitioner {
  displayName: string;
  id?: string;

  constructor(displayName: string, id?: string) {
    this.displayName = displayName;
    this.id = id;
  }
}
