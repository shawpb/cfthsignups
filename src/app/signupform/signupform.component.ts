import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import agencies from './agencies.json';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.sass'],
})
export class SignupformComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public pickupSelection: string;
  public verify = false;
  public hasSubmitted = false;
  public noIdChosen = false;
  public authUser: User;
  public isAdmin = false;
  public clientRefVerbiage = 'Myself';
  newClient: Client = new Client();
  selectedAgency: number = 0;
  agencyList: any[] = agencies;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pickupSelection = 'self';
    this.getUser();
  }

  async getUser(): Promise<any> {
    this.authUser = await this.authService
      .getUser()
      .then(async (user) => {
        this.clientRefVerbiage = 'The Client';
        this.newClient.Agency = user.Agency;
        await this.authService.isUserAdmin(user).then((isAdminStatus) => {
          this.isAdmin = isAdminStatus;
        });
        return user;
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }

  setAgencyPickUpInfo(): void {
    let userSelectedAgency = this.agencyList.find(
      (x) => x.id === this.selectedAgency
    );
    this.newClient.Agency = userSelectedAgency.name;
    this.newClient.AgencyRepFirstName = userSelectedAgency.contactFirstName;
    this.newClient.AgencyRepLastName = userSelectedAgency.contactLastName;
    this.newClient.AlternateFirstName = userSelectedAgency.contactFirstName;
    this.newClient.AlternateLastName = userSelectedAgency.contactLastName;
    this.newClient.AlternatePhone = userSelectedAgency.contactPhone;
  }

  updateCity(): void {
    if (this.newClient.City.toUpperCase() === 'SCH') {
      this.newClient.City = 'Schenectady';
    }
  }

  SaveClient(): void {
    this.clientService.AddClient(this.newClient);
  }

  showAlternate(): boolean {
    this.newClient.WhoDelivers = this.pickupSelection;
    if (
      this.pickupSelection === 'alternate' ||
      this.pickupSelection === 'agency'
    ) {
      return true;
    }
    return false;
  }

  verifyInfo(form): void {
    this.newClient.WhoDelivers = this.pickupSelection;
    this.hasSubmitted = true;
    this.noIdChosen = !this.IsIdSelected();
    if (
      this.selectedAgency != undefined &&
      this.selectedAgency !== 0 &&
      this.newClient.WhoDelivers === 'agency'
    ) {
      let userSelectedAgency = this.agencyList.find(
        (x) => x.id === this.selectedAgency
      );
      this.newClient.Agency = userSelectedAgency.name;
      this.newClient.AgencyRepFirstName = userSelectedAgency.contactFirstName;
      this.newClient.AgencyRepLastName = userSelectedAgency.contactLastName;
      this.newClient.AlternatePhone = userSelectedAgency.contactPhone;
    }

    if (form.valid && (this.authUser || !this.noIdChosen)) {
      this.verify = true;
    }
  }

  back(): void {
    this.verify = false;
  }

  IsIdSelected(): boolean {
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
    this.newClient.WhoDelivers = this.pickupSelection;
    this.SaveClient();
    alert(
      'Successfully saved: ' +
        this.newClient.FirstName +
        ' ' +
        this.newClient.LastName
    );
    this.newClient = new Client();
    this.verify = false;

    window.location.reload();
  }

  sortedAgencies(): any[] {
    return this.agencyList.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
  }
}
