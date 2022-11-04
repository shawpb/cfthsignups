import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import agencies from './agencies.json';
import { UserIdleService } from 'angular-user-idle';

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
  public showDemographics: boolean = true;
  public showExtraFields: boolean = false;
  newClient: Client = new Client();
  selectedAgency: number = 0;
  agencyList: any[] = agencies;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public authService: AuthService,
    private userIdle: UserIdleService
  ) {}

  ngOnInit(): void {
    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!');
      this.authService.SignOut();
      this.userIdle.stopTimer();
      this.userIdle.stopWatching();
      this.router.navigateByUrl('/login');
    });

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

  SaveClient() {
    return this.clientService.AddClient(this.newClient);
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

  verifyInfo(form: { valid: any }): void {
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
    this.SaveClient().subscribe({
      next: (requestId: any) => {
        console.debug('Request Id: ' + requestId);
        alert(
          'Successfully saved: ' +
            this.newClient.FirstName +
            ' ' +
            this.newClient.LastName
        );
      },
      error: (error) => {
        alert('There was an error saving: ' + error.message);
        console.debug('There was an error!' + error.message);
      },
      complete: () => {
        this.newClient = new Client();
        this.verify = false;
        this.hasSubmitted = false;

        window.location.reload();
      },
    });
  }

  sortedAgencies(): any[] {
    return this.agencyList.sort((a, b) => {
      let returnSortValue = this.sortByAgencyName(a, b);
      if (returnSortValue == 0) {
        returnSortValue = this.sortByAgentFirstName(a, b);
        if (returnSortValue == 0) {
          returnSortValue = this.sortByAgentLastName(a, b);
        }
      }

      return returnSortValue;
    });
  }

  private sortByAgencyName(a: any, b: any): number {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }

  private sortByAgentFirstName(a: any, b: any): number {
    return a.contactFirstName < b.contactFirstName
      ? -1
      : a.contactFirstName > b.contactFirstName
      ? 1
      : 0;
  }

  private sortByAgentLastName(a: any, b: any): number {
    return a.contactLastName < b.contactLastName
      ? -1
      : a.contactLastName > b.contactLastName
      ? 1
      : 0;
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
