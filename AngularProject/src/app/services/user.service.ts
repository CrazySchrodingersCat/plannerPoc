import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Practitioner } from '../models/practitioner.model';
import {environment} from "../../environments/environment";
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  // public getUserName: any;
  // public userName: any;

  public setUserList = new BehaviorSubject<any>([]);
  public getUserList = this.setUserList.asObservable();

  isPinned: boolean = false;

  getPractitioners(): Observable<Practitioner[]> {
    return this.http.get<Practitioner[]>(environment.apiUrl + '/Practitioner');
  }

  getPractitionerById(id: string): Observable<Practitioner> {
    return this.http.get<Practitioner>(
      environment.apiUrl + '/Practitioner/' + id
    );
  }

  deleteById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
      environment.apiUrl + '/Practitioner/' + id
    );
  }

  addPractitioner(newPractititoner: Practitioner): Observable<any> {
    return this.http.post<Practitioner>(
      environment.apiUrl + '/Practitioner/',
      newPractititoner
    );
  }

  editPractitioner(
    id: string,
    editPractititoner: Practitioner
  ): Observable<any> {
    return this.http.put<Practitioner>(
      environment.apiUrl + '/Practitioner/' + id,
      editPractititoner
    );
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.apiUrl + '/Client');
  }
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(environment.apiUrl + '/Client/' + id);
  }
  // getUserNameById(id: string): string {
  //   this.getClientById(id).subscribe(
  //     (user) => (this.userName = user.displayName)
  //   );
  //   return this.userName;
  // }
}
