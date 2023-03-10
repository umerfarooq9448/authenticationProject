import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service:ServiceService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.service.getToken();

    if(myToken){

      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myToken}`}
      })

    }

    


    return next.handle(request).pipe(

      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['login'])
          }
        }
        return throwError(()=>new Error("Some Error Occured"))
      })
    );
  }
}
