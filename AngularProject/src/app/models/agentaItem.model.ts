export class AgendaItem {
  id?: string;
  clientId: string;
  practitionerId: string;
  date: Date;
  startTime: Date;
  endTime: Date;

  constructor(
    clientId: string,
    practitionerId: string,
    date: Date,
    startTime: Date,
    endTime: Date,
    id?: string
  ) {
    this.id = id;
    this.clientId = clientId;
    this.practitionerId = practitionerId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
