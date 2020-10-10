import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { User } from '../Models/User';

@Injectable()
export class AuthService {
  @Output() userAuthStateChanged: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  constructor(public router: Router) {}

  signIn(username: string, password: string): Promise<CognitoUser | any> {
    return new Promise((resolve, reject) => {
      Auth.signIn(username, password)
        .then((user: CognitoUser | any) => {
          this.userAuthStateChanged.emit(true);
          resolve(user);
        })
        .catch((error: any) => reject(error));
    });
  }

  public SignOut(): void {
    Auth.signOut()
      .then(() => this.userAuthStateChanged.emit(false))
      .catch((err) => console.log(err));
  }

  async isAuthenticated(): Promise<boolean> {
    return await Auth.currentAuthenticatedUser()
      .then(() => true)
      .catch(() => false);
  }

  async isAdmin(): Promise<boolean> {
    return await Auth.currentAuthenticatedUser()
      .then((user) => {
        return this.isUserAdmin(user);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        return false;
      });
  }

  async isUserAdmin(user: any): Promise<boolean> {
    let isAdmin = false;
    return await Auth.currentSession()
      .then((data) => {
        const groups = data.getAccessToken().payload['cognito:groups'];
        groups.forEach((element: string) => {
          if (element === 'Admins') {
            isAdmin = true;
          }
        });
        return isAdmin;
      })
      .catch((err) => {
        console.log(err);
        return isAdmin;
      });
  }

  async getUser(): Promise<User | any> {
    let userInfo: any;
    let authUser: CognitoUser;

    return new Promise((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then((user: CognitoUser | any) => {
          authUser = user;
        })
        .then(() => {
          Auth.currentUserInfo().then((info: any) => {
            userInfo = info;
            resolve(new User(authUser, userInfo));
          });
        })
        .catch((error: any) => reject(error));
    });
  }

  getEmmiter(): EventEmitter<boolean> {
    return this.userAuthStateChanged;
  }
}
