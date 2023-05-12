import { Injectable } from "@angular/core";
import { S } from "@fullcalendar/core/internal-common";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public viewType = new Subject<string>();
  //'dayGridMonth,timeGridWeek,timeGridDay',

  private dateSource = new Subject<Date>();
  date$ = this.dateSource.asObservable();
  viewType$ = this.viewType.asObservable();

  setDate(date: Date) {
    this.dateSource.next(date);
  }
  setViewType(viewType: string) {
    this.viewType.next(viewType);
  }
  // getViewType() { return this.viewType}
}