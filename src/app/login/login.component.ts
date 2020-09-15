import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(public router: Router, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({ passwordValue: '' });
  }

  loginForm;

  ngOnInit(): void {}

  onSubmit(formData) {
    localStorage.setItem('admin', formData.passwordValue);
    this.router.navigate(['agency']);
  }
}
