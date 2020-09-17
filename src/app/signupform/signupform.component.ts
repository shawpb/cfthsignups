import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Agency } from '../Models/agency';
import { AgencyService } from '../Services/agency.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass'],
})
export class SignupformComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  selectedAgency: Agency;

  constructor(public agencyService: AgencyService) {
    this.selectedAgency = this.agencyService.GetCurrentAgency();
  }

  ngOnInit(): void {}
}
