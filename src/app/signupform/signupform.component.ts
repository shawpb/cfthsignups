import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Client } from '../Models/Client';
import { ClientService } from '../Services/client.service';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import { Agency } from '../Models/agency';
import { auth0SignInButton } from '@aws-amplify/ui';

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
  selectedAgency: string;

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
    let selectedAgency = this.agencyList.find(
      (x) => x.id === this.selectedAgency
    );
    this.newClient.Agency = selectedAgency.name;
    this.newClient.AgencyRepFirstName = selectedAgency.contactFirstName;
    this.newClient.AgencyRepLastName = selectedAgency.contactLastName;
    this.newClient.AlternateFirstName = selectedAgency.contactFirstName;
    this.newClient.AlternateLastName = selectedAgency.contactLastName;
    this.newClient.AlternatePhone = selectedAgency.contactPhone;
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
    let selectedAgency = this.agencyList.find(
      (x) => x.id === this.selectedAgency
    );
    this.newClient.Agency = selectedAgency.name;
    this.newClient.AgencyRepFirstName = selectedAgency.contactFirstName;
    this.newClient.AgencyRepLastName = selectedAgency.contactLastName;
    this.newClient.AlternatePhone = selectedAgency.contactPhone;

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

  agencyList: Array<Agency> = [
    new Agency(
      '2',
      '845 Broadway Commons',
      'Ed',
      'Kowaczyk',
      '518-374-9136 x 2800'
    ),
    new Agency('3', 'BNai Brith', 'Sara', 'Olin', '518-346-8797'),
    new Agency(
      '4',
      'Capital Region BOCES - Rotterdam Academy',
      'Vicki',
      'Sturn',
      '518-464-6302'
    ),
    new Agency(
      '5',
      'Catholic Charities - Family Services',
      'Maria',
      'Yorkshire',
      '518-372-5667'
    ),
    new Agency(
      '6',
      'Ellis Medicine Care Management',
      'Barbara',
      'Allen',
      '518-858-4494'
    ),
    new Agency(
      '7',
      'Ellis Medicine Care Management',
      'Tim',
      'Moon',
      '518-831-6909'
    ),
    new Agency(
      '8',
      'Joseph Allen Apartments',
      'Darlene',
      'Smith',
      '518-918-4017'
    ),
    new Agency('9', 'Mohawk Opportunities', 'Katy', 'Hanson', '518-836-3938'),
    new Agency('10', 'Mt Pleasant Commons', 'Aprill', 'Hall', '518-382-1848'),
    new Agency('11', 'Mt Olivet Church', 'H.', 'Sanders', ''),
    new Agency(
      '12',
      'New Life Ministries',
      'Rebecca',
      'Berggren',
      '518-370-4391'
    ),
    new Agency('13', 'Northeast Parents & Child', 'Canita', 'Murraty', ''),
    new Agency('14', 'Parsons Child & Family', 'Crystal', 'Noble', ''),
    new Agency(
      '15',
      'Rehabilitation Support Services',
      'Mary',
      'Nobles',
      '518-372-1100'
    ),
    new Agency(
      '16',
      'Rehabilitation Support Services - Health Home',
      'Amanda',
      'Milano',
      ''
    ),
    new Agency('17', 'SAFE Inc', 'Shannon', 'Keon', '518-374-0166'),
    new Agency(
      '18',
      'SCAP - Community Outreach',
      'Olga',
      'Diaz',
      '518-374-9181 x1222'
    ),
    new Agency(
      '19',
      'SCAP Early Learning Program',
      'Karen',
      'Hutton',
      '518-612-9840'
    ),
    new Agency(
      '20',
      'SCAP Early Learning Program',
      'Caryn',
      'March',
      '518-377-8539'
    ),
    new Agency(
      '21',
      'SCAP Early Learning Program',
      'Kristina',
      'Hunter',
      '518-377-7300'
    ),
    new Agency('22', 'SCAP Supported Housing', 'Ann', 'McCray', '518-275-8008'),
    new Agency('23', 'SCAP Supported Housing', '', '', ''),
    new Agency(
      '24',
      'Schenectady Community Action Program',
      'Ed',
      'Falterman',
      ''
    ),
    new Agency(
      '25',
      'Schenectady County DSS',
      'Anjanette',
      'Tucker',
      '518-391-1976'
    ),
    new Agency('26', 'Adult Protective', 'Mellissa', 'Buskey', '518-344-2835'),
    new Agency('27', 'St Anthonys Church', 'Doreen', 'Rossi', ''),
    new Agency(
      '28',
      'Steinmetz School',
      'Michelle',
      'Thornhill',
      '518-878-5693'
    ),
    new Agency('29', 'Summit Towers', 'Barbara', 'McBride', ''),
    new Agency('30', 'Van Corlaer School', 'Ryan', 'Saxton', ' '),
    new Agency(
      '31',
      'Washington Irving Educational Center',
      'Sue',
      'Steciak',
      '518-377-6530'
    ),
    new Agency('32', 'Young Parents United', 'Ginnie', 'Egan', ''),
    new Agency(
      '33',
      'Youth Advocate Program',
      'Kelsey',
      'Collins',
      '518-852-0563'
    ),
    new Agency(
      '34',
      'Catholic Charities Food Pharmacy',
      'Christine',
      'Passen',
      ''
    ),
    new Agency('35', 'Bethesda House', 'Louise', 'OLeary', ''),
    new Agency('36', 'Bethesda House - PG Wright', 'Louise', 'OLeary', ''),
    new Agency('37', 'Our Lady of Fatima Food Pantry', 'Rosanne', 'Fabar', ''),
    new Agency(
      '38',
      'Northeast Parents & Child Society',
      'Francesca',
      'Marine',
      ''
    ),
    new Agency('39', 'Scotia Glenville Food Pantry', 'Cindy', 'Gaige', ''),
    new Agency(
      '40',
      'St Lukes Daily Bread Food Pantry',
      'MaryJane',
      'Smith',
      ''
    ),
    new Agency('41', 'St Lukes Daily Bread Food Pantry', 'Kathy', 'Spano', ''),
    new Agency(
      '42',
      'Bread of Life Food Pantry (Messiah Lutheran Church)',
      'Joyce',
      'Gresham',
      ''
    ),
    new Agency(
      '43',
      'Bread of Life Food Pantry (Messiah Lutheran Church)',
      'Judy',
      'Becker',
      ''
    ),
    new Agency(
      '44',
      'Braman Hall Food Pantry',
      'Judith',
      'Warner',
      '518-956-1758'
    ),
    new Agency(
      '45',
      'Lighthouse Food Pantry',
      'Rose',
      'Schoening',
      '518-366-5817 (cell)'
    ),
    new Agency('46', 'The Bridge Food Pantry', 'Brita', 'Bookhout', ' '),
    new Agency(
      '47',
      'The Salvation Army of Schenectady',
      'Kelley',
      'Buckbee-Lutcher',
      ''
    ),
    new Agency(
      '48',
      'Schenectady Community Action Program',
      'Elise',
      'Martin',
      ''
    ),
    new Agency(
      '49',
      'Schenectady Community Ministries',
      'JoAnn',
      'Rafalik',
      ''
    ),
    new Agency('50', 'Schenectady Community Ministries', 'Shelly', 'Ford', ''),
    new Agency('51', 'City Mission', 'Erin', 'Simao', '518-346-2275 x 406'),
    new Agency('52', 'YWCA ', 'Demekia', 'Santana', ''),
    new Agency(
      '53',
      'Schenectady Community Action Program',
      'Addy',
      'Haberbush',
      ' '
    ),
    new Agency('54', 'State Street Food Pantry', 'Maria', 'Delacruz', ''),
    new Agency('55', 'State Street Food Pantry', 'Minnie', 'Torres', ''),
    new Agency(
      '56',
      'Schenectady Community Ministries',
      'Thomas',
      'Schofield',
      ''
    ),
    new Agency('57', 'Bethesda House', 'Kim', 'McPhail', ''),
    new Agency('58', 'Schenectady County DSS', '', '', ''),
    new Agency(
      '59',
      'Schenectady County DSS - Children & Family Services',
      'Nicole',
      'Wood',
      ''
    ),
    new Agency(
      '60',
      'Schenectdy County Department of Long Term Care',
      'Susan',
      'Wuest',
      ''
    ),
    new Agency(
      '61',
      'Schenectady Community Action Program',
      'Meredith',
      'Gebell',
      ''
    ),
    new Agency(
      '62',
      'Schenectady Community Action Program',
      'Alicia',
      'Lewis',
      '  '
    ),
    new Agency(
      '63',
      'Schenectady Community Action Program',
      'Asia',
      'Madison',
      '518-347-5361'
    ),
    new Agency(
      '64',
      'Schenectady County Adult Protective Services',
      '',
      '',
      ''
    ),
    new Agency(
      '65',
      'Schenectdy County Department of Long Term Care',
      'Janice',
      'Brownell',
      '518-382-8481'
    ),
    new Agency('66', 'Parsons Early Head Start', '', '', ''),
    new Agency('67', 'Parsons Children & Family Services', '', '', ''),
    new Agency('68', 'Family & Child Services', '', '', ''),
    new Agency(
      '69',
      'Rehabilitation Support Services',
      'Jessica',
      'Reichelt',
      ''
    ),
    new Agency('70', 'DSS- Housing & Homeless Services', '', '', ''),
    new Agency(
      '71',
      'Grace & Mercy Food Pantry',
      'Ron',
      'Butler',
      '518-630-8404'
    ),
    new Agency(
      '72',
      'Hamilton at Fulton  Elementary School',
      'Melanie',
      'Bennett',
      '845-325-6961'
    ),
    new Agency('73', 'Harmony Food Pantry', 'Grantley', 'McLeod', ''),
    new Agency(
      '74',
      'Parsons Child and Family Services',
      'Melissa',
      'Duell',
      ''
    ),
    new Agency(
      '75',
      'Parsons Child and Family Services',
      'Deborah',
      'Weir',
      ''
    ),
    new Agency(
      '76',
      'Parsons Child and Family Services',
      'Gretchen',
      'Roesch',
      ''
    ),
    new Agency(
      '77',
      'Parsons Child and Family Services',
      'Katie',
      'Waslaska',
      ''
    ),
    new Agency('78', 'Parsons Child and Family Services', 'Vicky', 'Leite', ''),
    new Agency('79', 'Northern Rivers Family Services', 'Jill', 'Jackson', ''),
    new Agency('80', 'Northern Rivers Family Services', 'Diana', 'Avery', ''),
    new Agency(
      '81',
      'Northern Rivers Family Services',
      'Rachel',
      'Biernik',
      ''
    ),
    new Agency(
      '82',
      'Northern Rivers Family Services',
      'Michael',
      'Massey',
      ''
    ),
    new Agency(
      '83',
      'Rehabilitation Support Services',
      'Hannah',
      'Springer',
      ''
    ),
    new Agency(
      '84',
      'Schenectady Community Action Program',
      'Jeanne',
      'Derwin',
      ''
    ),
    new Agency('85', 'Life Plan CCFO', 'Matthew', 'Girtler', ''),
    new Agency('86', 'Schenectady Childrens Home', 'Amanda', 'Mitchell', ''),
    new Agency('87', 'RSS', 'Nicole', 'Villavicencio', ''),
    new Agency('88', 'Northeast', 'Calli', 'Johnson', ''),
    new Agency('89', 'Nothern Rivers', 'Tara', 'Sheldon', ''),
    new Agency('90', 'Nothern Rivers', 'Rachel', 'Neal', ''),
    new Agency('91', 'Northern Rivers', 'Susan', 'Natale', ''),
    new Agency('92', 'Bethesda House', 'Wells', 'Wellington', ''),
    new Agency('93', '', 'Pete', 'Jones', ''),
    new Agency('94', 'Parsons', 'Melissa', 'Swan', ''),
    new Agency('95', 'Parsons', 'Danielle', 'Wood', ''),
    new Agency('96', 'Northern Rivers', 'Zulay', 'Urbistondo', ''),
    new Agency('97', 'CFTH', 'Sharon', 'Wemple', ''),
    new Agency('98', 'CFTH', 'Kim', 'Inserra', ''),
    new Agency('99', 'Youth Life Support Network', 'Francia', 'Rahiman', ''),
    new Agency('100', 'Bethesda House', 'Rachel', 'Bergerman', ''),
    new Agency('101', 'SCAP', 'Naomi', 'Wood', ''),
    new Agency('102', 'SCAP', 'Rene', 'Turnbull', ''),
    new Agency('103', 'Eddy Senior Care', 'Betsy', 'Tuttlebee', ''),
    new Agency('104', 'Parsons', 'Kailyn', 'Clapper', ''),
  ];
}
