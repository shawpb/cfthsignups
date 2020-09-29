import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
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
  public pickupSelection: string;
  public verify = false;
  public hasSubmitted = false;
  public noIdChosen = false;
  newClient: Client = new Client();

  constructor(
    public agencyService: AgencyService,
    public clientService: ClientService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.selectedAgency = this.agencyService.GetCurrentAgency();
    this.pickupSelection = 'self';
  }

  SaveClient(): void {
    if (this.selectedAgency !== null && this.selectedAgency !== undefined) {
      this.newClient.Agency = this.selectedAgency.name;
    }
    this.clientService.AddClient(this.newClient);
  }

  showAlternate(): boolean {
    if (this.pickupSelection === 'alternate') {
      return true;
    }
    return false;
  }

  verifyInfo(form): void {
    this.hasSubmitted = true;
    this.noIdChosen = !this.CheckIdSelection();

    if (form.valid && !this.noIdChosen) {
      this.verify = true;
    }
  }

  back(): void {
    this.verify = false;
  }

  CheckIdSelection(): boolean {
    return (
      this.newClient.BenefitCard ||
      this.newClient.CommunityReferral ||
      this.newClient.HeapLetter ||
      this.newClient.MuniHousing ||
      this.newClient.SSILetter ||
      this.newClient.SsdLetter ||
      this.newClient.Unemployment ||
      this.newClient.WICCard
    );
  }

  onSubmit(): void {
    this.SaveClient();
    alert(
      'Successfully saved: ' +
        this.newClient.FirstName +
        ' ' +
        this.newClient.LastName
    );
    this.router.navigate(['/']);
  }
}
