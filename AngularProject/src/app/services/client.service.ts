import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.apiUrl + '/Client');
  }
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(environment.apiUrl + '/Client/' + id);
  }
}
