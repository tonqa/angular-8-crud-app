import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public username: string;
  public password: string;
  public userInfo: any;
  public loggedInAs: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.userInfo = this.authenticationService.getUserInfo();
  }

  ngOnDestroy() {
    this.authenticationService.redirectUrl = null;
  }

  public login() {
    this.authenticationService
      .doLogin(this.username, this.password)
      .subscribe(
        _ => {
          this.loggedInAs = 'Logged in as ' + this.authenticationService.getUserInfo().username;
          this.userInfo = this.authenticationService.getUserInfo();
          if (this.authenticationService.redirectUrl) {
            // Redirect the user
            this.router.navigate([this.authenticationService.redirectUrl]);
          }
        },
        _ => this.loggedInAs = 'Login failed'
      );
  }

  public logout() {
    this.authenticationService.doLogout();
    this.userInfo = null;
    this.loggedInAs = 'Logged out';
  }

}
