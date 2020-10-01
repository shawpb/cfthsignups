import { Component, OnInit } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-agencyinfo',
  templateUrl: './agencyinfo.component.html',
  styleUrls: ['./agencyinfo.component.sass'],
})
export class AgencyinfoComponent implements OnInit {
  public userInfo: CognitoUser;
  public profile: any = {};
  public userName: string;
  public firstName: string;
  public lastName: string;
  public Agency: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.GetUserInfo();
  }

  async GetUserInfo(): Promise<any> {
    this.profile = await Auth.currentUserInfo();
    this.userInfo = await Auth.currentAuthenticatedUser();
    //  if (this.profile.attributes['profile']) {
    //    this.avatar = this.profile.attributes['profile'];
    //    this.currentAvatarUrl = (await Storage.vault.get(this.avatar)) as string;
    //  }
    this.userName = this.userInfo.getUsername();
    this.firstName = this.profile.attributes['given_name'];
    this.lastName = this.profile.attributes['family_name'];
    this.Agency = this.profile.attributes['custom:Agency'];
  }
}
