import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceService } from '../services/service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private auth:ServiceService,private router:Router){}
  canActivate():boolean{
    if(this.auth.isLoggedIn()){

      return true;
    }
    else{
      this.router.navigate(['login'])
      return false;
    }
  }



  

}
