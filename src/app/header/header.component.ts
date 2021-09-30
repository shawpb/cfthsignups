import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  showLogout = false;
  public currentUser: User;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public Agency: string;

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getEmmiter().subscribe((a: boolean) => {
      this.showLogout = a;
    });
    this.getUser();
  }

  async getUser(): Promise<any> {
    this.GetUserInfo();
    this.showLogout = await this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.SignOut();
  }

  async GetUserInfo(): Promise<any> {
    await this.authService.getUser().then((user) => {
      this.currentUser = user;
      this.userName = user.UserName;
      this.firstName = user.FirstName;
      this.lastName = user.LastName;
      this.Agency = user.Agency;
    });
  }
}
