import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Practitioner } from '../models/practitioner.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  constructor(private http:HttpClient) { }

  getPractitioners():Observable<Practitioner[]>{
    return this.http.get<Practitioner[]>(environment.apiUrl + '/Practitioner')
  }

  getPractitionerById( id: string):Observable<Practitioner>{
    return this.http.get<Practitioner>(environment.apiUrl + '/Practitioner/' + id)
  }
}
