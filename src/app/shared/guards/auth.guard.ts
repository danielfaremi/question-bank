import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private notification: NzNotificationService,
    private router: Router
  ) { }

  private getToken(): boolean {
    return localStorage.getItem('login') === 'true';
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.getToken()) {
      this.notification.create('error', 'Forbidden', 'Login To Continue');
      this.router.navigate(['/','welcome'])
      return false;
    }
    return this.getToken();
  } 

}
