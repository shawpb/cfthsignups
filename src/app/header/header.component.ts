import { Component, OnInit } from '@angular/core';
import { Agency } from '../Models/agency';
import { AgencyService } from '../Services/agency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public selectedAgency: Agency;

  constructor(public agencyService: AgencyService) {
    this.selectedAgency = this.agencyService.GetCurrentAgency();
  }

  ngOnInit(): void {}

  logout(): void {
    this.agencyService.Logout();
  }

  hasAgency(): boolean {
    if (this.selectedAgency !== null && this.selectedAgency !== undefined) {
      return true;
    }
    return false;
  }
}
