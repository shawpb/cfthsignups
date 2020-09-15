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

    if (localStorage.getItem('admin') === 'supersecret') {
      return true;
    }

    return false;
  }
}
