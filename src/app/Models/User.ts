import { CognitoUser } from 'amazon-cognito-identity-js';

export class User {
  private authUser: CognitoUser;
  private userProfile: any;

  constructor(authedUser: CognitoUser | any, userp: any) {
    this.authUser = authedUser;
    this.userProfile = userp;
  }

  get FirstName(): string {
    return this.userProfile.attributes['given_name'];
  }
  get LastName(): string {
    return this.userProfile.attributes['family_name'];
  }
  get Agency(): string {
    return this.userProfile.attributes['custom:Agency'];
  }
  get UserName(): string {
    return this.authUser.getUsername();
  }
}
