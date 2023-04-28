import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AgendaItem } from '../models/agentaItem.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  constructor(private http: HttpClient) {}
  getAgendaForClientByDate(id: string, date: string) {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Client/' + id + '/Date' + date
    );
  }
  getAgendaForPractitionerByDate(id: string, date: string) {
    return this.http.get<AgendaItem[]>(
      environment.apiUrl + '/Practitioner/' + id + '/Date/' + date
    );
  }
}
