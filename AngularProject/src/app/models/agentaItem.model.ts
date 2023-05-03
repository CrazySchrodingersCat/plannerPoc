import { Client } from "./client.model";
import { Practitioner } from "./practitioner.model";

export class AgendaItem {
  id?: string;
  client: Client;
  practitioner: Practitioner;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  start: number;

  constructor(
    client: Client,
    practitioner: Practitioner,
    date: Date,
    startTime: Date,
    endTime: Date,
    id?: string,
    duration: number = 1,
    start: number = 7
  ) {
    this.id = id;
    this.duration = duration;
    this.start = start;
    this.client = client;
    this.practitioner = practitioner;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
