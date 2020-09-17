import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public router: Router) {}

  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);

    const adminValue = sessionStorage.getItem('admin');

    if (
      adminValue !== undefined &&
      adminValue !== null &&
      this.ValidatePassword(adminValue)
    ) {
      return true;
    }

    return false;
  }

  public ValidatePassword(passwordValue: string): boolean {
    if (passwordValue === 'supersecret') {
      return true;
    }
    return false;
  }
}
