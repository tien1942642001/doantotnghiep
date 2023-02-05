import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AppInterceptor } from "../interceptor/app.interceptor";

@Injectable()
export class AuthGuardService {
  constructor(
    public auth: AppInterceptor,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
