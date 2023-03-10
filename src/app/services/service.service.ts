import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{JwtHelperService} from '@auth0/angular-jwt'
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url="https://localhost:7068/";
  private userPayload:any;
  name:string="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  role:string="http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  
  constructor(private httpclient:HttpClient,private router:Router) { 
    this.userPayload = this.decodedToken();
  }
  
  public login(user:User){
    return this.httpclient.post<any>(this.url+"login",user)
  }

  public register(user:User):Observable<User[]>{
    return this.httpclient.post<User[]>(this.url+"signup",user)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }


  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    console.log(jwtHelper.decodeToken(<string>token))
    return jwtHelper.decodeToken(<string>token)
    
  }

  getFullNameFromToken(){
    if(this.userPayload){
      
      return this.userPayload[this.name];
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload[this.role];
    }

  }



}
