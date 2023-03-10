import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  url="https://localhost:7068/";
  constructor(private httpclient:HttpClient) { }

  getAllUsers(){
    return this.httpclient.get<any>(this.url+"getAllUsers")
  }
}
