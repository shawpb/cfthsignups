import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  showLogout = false;
  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getEmmiter().subscribe((a: boolean) => {
      this.showLogout = a;
    });
    this.getUser();
  }

  async getUser(): Promise<any> {
    this.showLogout = await this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.SignOut();
  }
}
