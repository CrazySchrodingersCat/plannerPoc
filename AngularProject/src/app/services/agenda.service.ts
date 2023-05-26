import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgendaItem } from '../models/agentaItem.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  public setPinnedUserDate = new BehaviorSubject<any>([]);
  public getPinnedUserDate = this.setPinnedUserDate.asObservable();

  constructor(private http: HttpClient) {}
  getAgendaForClientByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Client/' + id + '/Date/' + date
    );
  }
  getWeekAgendaForClientByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Client/' + id + '/Week/' + date
    );
  }
  getUserInformation(id: number) {}
  getAgendaForPractitionerByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Practitioner/' + id + '/Date/' + date
    );
  }
  getWeekAgendaForPractitionerByDate(
    id: string,
    date: string
  ): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Practitioner/' + id + '/Week/' + date
    );
  }

  getMonthAgendaForPractitionerByDate(
    id: string,
    date: string
  ): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Practitioner/' + id + '/Months/' + date
    );
  }

  getMonthAgendaForClientByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Client/' + id + '/Months/' + date
    );
  }
}
