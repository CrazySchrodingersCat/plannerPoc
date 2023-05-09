import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public getUserName: any;
  public userName: any;

  public setUserList = new BehaviorSubject<any>([]);
  public getUserList = this.setUserList.asObservable();

  constructor(private http: HttpClient) {}

}
