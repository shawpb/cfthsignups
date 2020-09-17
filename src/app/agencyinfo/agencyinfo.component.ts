import { Component, OnInit } from '@angular/core';
import { Agency } from '../Models/agency';
import { AgencyService } from '../Services/agency.service';

@Component({
  selector: 'app-agencyinfo',
  templateUrl: './agencyinfo.component.html',
  styleUrls: ['./agencyinfo.component.sass'],
})
export class AgencyinfoComponent implements OnInit {
  public selectedAgency: Agency;

  constructor(public agencyService: AgencyService) {
    this.selectedAgency = this.agencyService.GetCurrentAgency();
  }

  ngOnInit(): void {}
}
