import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // get token
    const token = this.authService.getToken();
    // Clone the request and add the Authorization header
    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer' + token)
    });
    return next.handle(authReq);
  }
}
