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
  end: number;
  hasOverlay: boolean;
  shift: boolean;

  constructor(
    client: Client,
    practitioner: Practitioner,
    date: Date,
    startTime: Date,
    endTime: Date,
    id?: string,
    duration: number = 1,
    start: number = 7,
    end: number = 8,
    hasOverlay: boolean = false,
    shift: boolean = false
  ) {
    this.id = id;
    this.duration = duration;
    this.start = start;
    this.end = end;
    this.client = client;
    this.practitioner = practitioner;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;

    this.hasOverlay = hasOverlay;
    this.shift = shift;
  }

  findOverlapping(list: AgendaItem[]): void {
    list.forEach((item, index) => {
      if (index === 0) {
        return; // Skip the first item
      }

      const prevItem = list[index - 1];

      if (item.startTime < prevItem.endTime) {
        item.hasOverlay = true;
        // item.position = 1;
      }
    });
  }
}
