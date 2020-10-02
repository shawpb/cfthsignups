import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-agencyinfo',
  templateUrl: './agencyinfo.component.html',
  styleUrls: ['./agencyinfo.component.sass'],
})
export class AgencyinfoComponent implements OnInit {
  public currentUser: User;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public Agency: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.GetUserInfo();
  }

  async GetUserInfo(): Promise<any> {
    this.currentUser = await this.authService.getUser();
    this.userName = this.currentUser.UserName;
    this.firstName = this.currentUser.FirstName;
    this.lastName = this.currentUser.LastName;
    this.Agency = this.currentUser.Agency;
  }
}
