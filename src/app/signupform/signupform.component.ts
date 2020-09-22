import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Agency } from '../Models/agency';
import { Client } from '../Models/Client';
import { AgencyService } from '../Services/agency.service';
import { ClientService } from '../Services/client.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass'],
})
export class SignupformComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public selectedAgency: Agency;
  newClient: Client = new Client();

  constructor(
    public agencyService: AgencyService,
    public clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.selectedAgency = this.agencyService.GetCurrentAgency();
  }

  SaveClient(): void {
    this.clientService.AddClient(this.newClient);
  }
}
