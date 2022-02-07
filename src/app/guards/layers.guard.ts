import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class LayersGuard implements CanActivate {
  constructor (
    private backend: BackendService,
    private router: Router,
    private message: NzMessageService,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.backend.isLoggedIn() && this.backend.getAccountType() === "ADMIN"){
        return true;
      } else {
        this.router.navigate(['login'])
        this.message.create("warning", "Please Sign In As Administrator To Continue!")
        return false

      }
}
  
}
