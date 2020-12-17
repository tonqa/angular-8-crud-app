import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authHeader = this.authenticationService.getAuthorizationHeader();

    if (authHeader) {
      request = request.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
    }

    return next.handle(request);
  }
}
