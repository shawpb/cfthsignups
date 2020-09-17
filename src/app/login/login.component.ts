import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { AgencyService } from '../Services/agency.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  passwordValue = new FormControl('', [Validators.required, Validators.min(3)]);
  constructor(
    public router: Router,
    public authService: AuthService,
    public agencyService: AgencyService
  ) {}
  hide = true;

  ngOnInit(): void {}

  onSubmit(passwordValue: string): void {
    if (this.authService.ValidatePassword(passwordValue)) {
      const aId = this.agencyService.GetAgencyByPassword(passwordValue);
      this.agencyService.SetCurrentAgency(aId.id);
      this.router.navigate(['signup']);
    }
  }
}
