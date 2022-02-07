import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private backend: BackendService,
    private router: Router,
    private message: NzMessageService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.backend.isLoggedIn()){
      this.router.navigate(['login'])
      return false;
    }
    return this.backend.isLoggedIn();
  } 
}
