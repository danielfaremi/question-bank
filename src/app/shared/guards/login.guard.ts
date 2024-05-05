import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {
  constructor(
    private notification: NzNotificationService,
    private router: Router
  ) { }
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.getToken()) {
      // User is logged in, redirect to dashboard
      return this.router.createUrlTree(['/dashboard']);
    } else {
      // User is not logged in, allow access to login page
      return true;
    }
  }

  private getToken(): boolean {
    return localStorage.getItem('login') === 'true';
  }
  
}
