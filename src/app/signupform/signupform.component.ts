import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AuthService } from '../Services/auth.service';

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
  public authUser: CognitoUser;
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
    this.authUser = await this.authService.getUser().catch((error) => {
      console.log(JSON.stringify(error));
    });
  }

  SaveClient(): void {
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
