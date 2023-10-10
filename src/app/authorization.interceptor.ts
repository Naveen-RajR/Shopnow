import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //get the token
    const token=localStorage.getItem('token');
    //clone the request and add the authorization header if a token exists
    if(token){
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
    }
    //continue with the modified request
    return next.handle(request);
  }
}
