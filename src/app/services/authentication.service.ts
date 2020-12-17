import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public basicHeaderValue: string;
  public userInfo: any;
  public redirectUrl: any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    // initialize token from cookie
    this.basicHeaderValue = cookieService.get('basicHeaderValue');

    if (this.basicHeaderValue) {
      this.checkLogin();
    }
  }

  public doLogin(username: any, password: any): Observable<any> {
    this.basicHeaderValue = null;
    this.cookieService.delete('basicHeaderValue');
    this.userInfo = null;

    return this.http.get<any>(baseUrl, {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(username + ':' + password)
      })
    }).pipe(
      tap(
        event => {
          console.log(event);
          this.basicHeaderValue = btoa(username + ':' + password);
          // save token into cookie
          this.cookieService.set('basicHeaderValue', this.basicHeaderValue);
          this.userInfo = event;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  public doLogout() {
    this.basicHeaderValue = null;
    this.cookieService.delete('basicHeaderValue');
    this.userInfo = null;
  }

  private checkLogin() {
    return this.http.get<any>(baseUrl)
    .pipe(
      tap(
        event => {
          console.log(event);
          this.userInfo = event;
        },
        error => {
          console.log(error);
          this.basicHeaderValue = null;
          // delete token from cookie if not valid
          this.cookieService.delete('basicHeaderValue');
          this.userInfo = null;
        }
      )
    );
  }

  public getUserInfo() {
    return this.userInfo;
  }

  public getAuthorizationHeader() {
    if (this.basicHeaderValue) {
      return 'Basic ' + this.basicHeaderValue;
    }

    return null;
  }
}
