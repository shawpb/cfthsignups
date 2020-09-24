import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../Models/agency';
import { AgencyService } from '../Services/agency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public selectedAgency: Agency;

  constructor(public agencyService: AgencyService, public router: Router) {
    if (this.selectedAgency === null || this.selectedAgency === undefined) {
      this.selectedAgency = this.agencyService.GetCurrentAgency();
    }
  }

  ngOnInit(): void {
    this.agencyService.getEmitter().subscribe((a: Agency) => {
      this.selectedAgency = a;
    });
  }

  logout(): void {
    this.agencyService.Logout();
  }

  agencyClick(): void {
    if (this.selectedAgency) {
      this.router.navigate(['/signup']);
    } else {
      this.router.navigate(['/agency']);
    }
  }

  hasAgency(): boolean {
    if (this.selectedAgency !== null && this.selectedAgency !== undefined) {
      return true;
    }
    return false;
  }
}
