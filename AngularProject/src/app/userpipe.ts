import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { ClientService } from './services/client.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as moment from 'moment';

@Pipe({
  name: 'userPipe',
})
@Injectable({
  providedIn: 'root',
})
export class UserPipe implements PipeTransform {
  public setUserName = new BehaviorSubject<[]>([]);
  public getUserName = this.setUserName.asObservable();

  clientName: any;
  constructor(private clientService: ClientService) {}
  transform(start: Date, end: Date): unknown {
    //const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    console.log(moment(start, 'HH:mm:ss'));
    const startMoment = moment(start, 'HH:mm:ss');
    const endMoment = moment(end, 'HH:mm:ss');
    const duration = moment.duration(endMoment.diff(startMoment));
    console.log('duration ', duration.hours);
    const durationHours = duration.hours();
    const durationMinutes = duration.minutes();
    const durationSeconds = duration.seconds();
    return `${durationHours}`;
  }
}
