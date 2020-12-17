import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log('AuthGuard#canActivate called');
      const url: string = state.url;
      return this.forwardToLogin(url);
  }
  
  forwardToLogin(url: string): true|UrlTree {
    if (this.authenticationService.userInfo != null) { return true; }

    this.authenticationService.redirectUrl = url;
    return this.router.parseUrl('/login');
  }

}
