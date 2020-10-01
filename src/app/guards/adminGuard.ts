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
        this.router.navigate(['/']);
        return false;
      })
      .catch(() => {
        this.router.navigate(['/']);
        return false;
      });
  }
}
