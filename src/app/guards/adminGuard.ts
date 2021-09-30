import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    return this.auth
      .isAdmin()
      .then((isAdmin) => {
        if (isAdmin) {
          return true;
        }
        throw new Error("not admin");
      })
      .catch(() => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}
