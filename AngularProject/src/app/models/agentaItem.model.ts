import { Client } from "./client.model";
import { Practitioner } from "./practitioner.model";

export class AgendaItem {
  id?: string;
  client: Client;
  practitioner: Practitioner;
  date: Date;
  startTime: Date;
  endTime: Date;

  constructor(
    client: Client,
    practitioner: Practitioner,
    date: Date,
    startTime: Date,
    endTime: Date,
    id?: string
  ) {
    this.id = id;
    this.client = client;
    this.practitioner = practitioner;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
