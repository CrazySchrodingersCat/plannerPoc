import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public setViewType = new BehaviorSubject<string>('timeGridDay');
  public getViewType = this.setViewType.asObservable();
  //'dayGridMonth,timeGridWeek,timeGridDay',

  public setSelectedDate = new BehaviorSubject<any>([]);
  public getSelectedDate = this.setSelectedDate.asObservable();

  private dateSource = new Subject<Date>();
  date$ = this.dateSource.asObservable();
  viewType: string = 'timeGridDay';

  getViewByDay() {
    this.viewType = 'timeGridWeek';
  }
  setDate(date: Date) {
    this.dateSource.next(date);
  }
  // setViewType(viewType: string) {
  //   this.viewType.next(viewType);
  // }
  // getViewType() { return this.viewType}
}
