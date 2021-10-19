import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class UnAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    return Auth.currentAuthenticatedUser()
      .then(() => {
        this.router.navigate(['/signup']);
        return false;
      })
      .catch(() => {
        return true;
      });
  }
}
