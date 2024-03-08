import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ExampleInterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   // Log the request url and method
  //   // console.log(
  //   //   `Sending HTTP request to ${request.url} with method ${request.method}`
  //   // );
  //   //continue with the request and capture the responses;
  //   return next.handle(request).pipe(
  //     //log the response data
  //     tap((event) => {
  //       if (event instanceof HttpResponse) {
  //         // console.log(`Received HTTP response with status ${event.status}`);
  //       }
  //     })
  //   );
  // }
}
