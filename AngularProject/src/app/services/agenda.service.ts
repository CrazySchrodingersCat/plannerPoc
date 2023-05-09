import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgendaItem } from '../models/agentaItem.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  public setSelectedDate = new BehaviorSubject<any>([]);
  public getSelectedDate = this.setSelectedDate.asObservable();

  public setPinnedUserDate = new BehaviorSubject<any>([]);
  public getPinnedUserDate = this.setPinnedUserDate.asObservable();

  constructor(private http: HttpClient) {}
  getAgendaForClientByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Client/' + id + '/Date/' + date
    );
  }
  getUserInformation(id: number) {}
  getAgendaForPractitionerByDate(id: string, date: string): Observable<any> {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Practitioner/' + id + '/Date/' + date
    );
  }
}
