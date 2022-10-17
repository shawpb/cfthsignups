import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { CognitoUser } from '@aws-amplify/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  // passwordValue = new FormControl('', [Validators.required, Validators.min(3)]);
  // usernameValue = new FormControl('', Validators.required);
  // hide = true;
  // error = false;
  // errorMesg = '';

  // constructor(public router: Router, public authService: AuthService) {}

  // ngOnInit(): void {}

  // onSubmit(passwordValue: string, usernameValue: string): void {
  //   this.authService
  //     .signIn(usernameValue, passwordValue)
  //     .then(() => this.router.navigate(['signup']))
  //     .catch((error) => {
  //       this.error = true;
  //       this.errorMesg = JSON.stringify(error.message);
  //     });
  // }
  signinForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.min(6)]),
  });

  hide = true;
  badLogin = false;

  get emailInput(): AbstractControl {
    return this.signinForm.get('email');
  }
  get passwordInput(): AbstractControl {
    return this.signinForm.get('password');
  }

  constructor(public auth: AuthService, private router: Router) {}

  getEmailInputError(): string {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.';
    }
  }

  getPasswordInputError(): string {
    if (this.badLogin) {
      return 'Login credentials were invalid.';
    } else if (this.passwordInput.hasError('required')) {
      return 'A password is required.';
    }
  }

  signIn(): void {
    this.auth
      .signIn(this.emailInput.value, this.passwordInput.value)
      .then((user: CognitoUser | any) => {
        this.router.navigate(['/signup']);
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'NotAuthorizedException':
            this.badLogin = true;
            this.signinForm.get('password').setErrors({ serverError: '' });
            break;
        }
      });
  }
}
