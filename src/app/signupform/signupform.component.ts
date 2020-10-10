import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';

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
    this.newClient.AlternateFirstName = this.authUser.FirstName;
    this.newClient.AlternateLastName = this.authUser.LastName;
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
    if (this.authUser) {
      this.newClient.Agency = this.authUser.Agency;
      this.newClient.AgencyRepFirstName = this.authUser.FirstName;
      this.newClient.AgencyRepLastName = this.authUser.LastName;
    }
    this.newClient.WhoDelivers = this.pickupSelection;
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
