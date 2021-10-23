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
  selectedAgency: string = '0';

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
      this.selectedAgency !== '0' &&
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

  agencyList: Array<Agency> = [
    new Agency(
      '2',
      '845 Broadway Commons',
      'Ed',
      'Kowaczyk',
      '518-374-9136 x 2800'
    ),
    new Agency('3', 'Adult Protective', 'Mellissa', 'Buskey', '518-344-2835'),
    new Agency('4', 'Bethesda House', 'Rachel', 'Bergerman', ''),
    new Agency('5', 'Bethesda House', 'Kim', 'McPhail', ''),
    new Agency('6', 'Bethesda House', 'Louise', 'OLeary', ''),
    new Agency('7', 'Bethesda House', 'Wells', 'Wellington', ''),
    new Agency('8', 'Bethesda House - PG Wright', 'Louise', 'OLeary', ''),
    new Agency('9', 'BNai Brith', 'Elizabeth', 'Burby', '518-346-8797'),
    new Agency(
      '10',
      'Braman Hall Food Pantry',
      'Judith',
      'Warner',
      '518-956-1758'
    ),
    new Agency(
      '11',
      'Bread of Life Food Pantry (Messiah Lutheran Church)',
      'Judy',
      'Becker',
      ''
    ),
    new Agency(
      '12',
      'Bread of Life Food Pantry (Messiah Lutheran Church)',
      'Joyce',
      'Gresham',
      ''
    ),
    new Agency(
      '13',
      'Capital Region BOCES - Rotterdam Academy',
      'Vicki',
      'Sturn',
      '518-464-6302'
    ),
    new Agency('14', 'Care Design NY', 'Jane', 'Haiar', ''),
    new Agency(
      '15',
      'Catholic Charities - Family Services',
      'Maria',
      'Yorkshire',
      '518-372-5667'
    ),
    new Agency(
      '16',
      'Catholic Charities Food Pharmacy',
      'Christine',
      'Passen',
      ''
    ),
    new Agency('17', 'CFTH', 'Kim', 'Inserra', ''),
    new Agency('18', 'CFTH', 'Sharon', 'Wemple', ''),
    new Agency('19', 'City Mission', 'Erin', 'Simao', '518-346-2275 x 406'),
    new Agency('20', 'DSS- Housing & Homeless Services', '', '', ''),
    new Agency('21', 'Eddy Senior Care', 'Betsy', 'Tuttlebee', ''),
    new Agency(
      '22',
      'Ellis Medicine Care Management',
      'Barbara',
      'Allen',
      '518-858-4494'
    ),
    new Agency(
      '23',
      'Ellis Medicine Care Management',
      'Tim',
      'Moon',
      '15188584488'
    ),
    new Agency('24', 'Family & Child Services', '', '', ''),
    new Agency(
      '25',
      'Grace & Mercy Food Pantry',
      'Ron',
      'Butler',
      '518-630-8404'
    ),
    new Agency(
      '26',
      'Hamilton at Fulton  Elementary School',
      'Michelle',
      'Primomo',
      '5188813720'
    ),
    new Agency('27', 'Harmony Food Pantry', 'Grantley', 'McLeod', ''),
    new Agency(
      '28',
      'Joseph Allen Apartments',
      'Darlene',
      'Smith',
      '518-918-4017'
    ),
    new Agency('29', 'Life Plan CCFO', 'Matthew', 'Girtler', ''),
    new Agency(
      '30',
      'Lighthouse Food Pantry',
      'Rose',
      'Schoening',
      '518-366-5817 (cell)'
    ),
    new Agency(
      '31',
      'Mohawk Opportunities',
      'Bryan',
      'Gentile',
      '518-836-3938'
    ),
    new Agency('32', 'Mt Olivet Church', 'H.', 'Sanders', ''),
    new Agency('33', 'Mt Pleasant Commons', 'Aprill', 'Hall', '518-382-1848'),
    new Agency(
      '34',
      'Nationally Touching Greatness',
      'Delvern',
      'Cooper',
      '5189770227'
    ),
    new Agency(
      '35',
      'New Life Ministries',
      'Rebecca',
      'Berggren',
      '518-370-4391'
    ),
    new Agency('36', 'Northeast', 'Calli', 'Johnson', ''),
    new Agency('37', 'Northeast Parents & Child', 'Canita', 'Murraty', ''),
    new Agency(
      '38',
      'Northeast Parents & Child Society',
      'Francesca',
      'Marine',
      ''
    ),
    new Agency('39', 'Northern Rivers', 'Susan', 'Natale', ''),
    new Agency('40', 'Northern Rivers', 'Zulay', 'Urbistondo', ''),
    new Agency('41', 'Northern Rivers Family Services', 'Diana', 'Avery', ''),
    new Agency(
      '42',
      'Northern Rivers Family Services',
      'Rachel',
      'Biernik',
      ''
    ),
    new Agency('43', 'Northern Rivers Family Services', 'Jill', 'Jackson', ''),
    new Agency(
      '44',
      'Northern Rivers Family Services',
      'Michael',
      'Massey',
      ''
    ),
    new Agency('45', 'Nothern Rivers', 'Rachel', 'Neal', ''),
    new Agency('46', 'Nothern Rivers', 'Tara', 'Sheldon', ''),
    new Agency('47', 'Our Lady of Fatima Food Pantry', 'Rosanne', 'Fabar', ''),
    new Agency('48', 'Parsons', 'Kailyn', 'Clapper', ''),
    new Agency('49', 'Parsons', 'Melissa', 'Swan', ''),
    new Agency('50', 'Parsons', 'Danielle', 'Wood', ''),
    new Agency(
      '51',
      'Parsons Child and Family Services',
      'Dianna',
      'Avery',
      ''
    ),
    new Agency(
      '52',
      'Parsons Child and Family Services',
      'Crystal',
      'Noble',
      ''
    ),
    new Agency(
      '53',
      'Parsons Child and Family Services',
      'Melissa',
      'Duell',
      ''
    ),
    new Agency(
      '54',
      'Parsons Child and Family Services',
      'Katrina',
      'Giardino',
      '5183126503'
    ),
    new Agency('55', 'Parsons Child and Family Services', 'Vicky', 'Leite', ''),
    new Agency(
      '56',
      'Parsons Child and Family Services',
      'Gretchen',
      'Roesch',
      ''
    ),
    new Agency(
      '57',
      'Parsons Child and Family Services',
      'Katie',
      'Waslaska',
      ''
    ),
    new Agency(
      '58',
      'Parsons Child and Family Services',
      'Deborah',
      'Weir',
      ''
    ),
    new Agency('59', 'Parsons Child and Family Services', '', '', ''),
    new Agency('60', 'Parsons Early Head Start', '', '', ''),
    new Agency(
      '61',
      'Rehabilitation Support Services',
      'Mary',
      'Nobles',
      '518-372-1100'
    ),
    new Agency(
      '62',
      'Rehabilitation Support Services',
      'Jessica',
      'Reichelt',
      ''
    ),
    new Agency(
      '63',
      'Rehabilitation Support Services',
      'Hannah',
      'Springer',
      ''
    ),
    new Agency(
      '64',
      'Rehabilitation Support Services - Health Home',
      'Amanda',
      'Milano',
      ''
    ),
    new Agency(
      '65',
      'Rotterdam Boys and Girls Club',
      'Julie',
      'Rouse',
      '5183557440'
    ),
    new Agency('66', 'RSS', 'Nicole', 'Villavicencio', ''),
    new Agency('67', 'SAFE Inc', 'Robin', 'Romines', '518-374-0166'),
    new Agency('68', 'SCAP', 'Emily', 'Aube', '5183749181'),
    new Agency('69', 'SCAP', 'Jessica', 'Dearstyne', '5183966271'),
    new Agency('70', 'SCAP', 'Deborah', 'Ortiz', '5183778539'),
    new Agency('71', 'SCAP', 'Rene', 'Turnbull', ''),
    new Agency('72', 'SCAP', 'Naomi', 'Wood', ''),
    new Agency('73', 'SCAP', 'Leigh', 'Zanobia', '5183749181'),
    new Agency(
      '74',
      'SCAP - Community Outreach',
      'Olga',
      'Diaz',
      '518-374-9181 x1222'
    ),
    new Agency(
      '75',
      'SCAP Early Learning Program',
      'Kristina',
      'Hunter',
      '518-377-7300'
    ),
    new Agency(
      '76',
      'SCAP Early Learning Program',
      'Karen',
      'Hutton',
      '518-612-9840'
    ),
    new Agency(
      '77',
      'SCAP Early Learning Program',
      'Caryn',
      'March',
      '518-377-8539'
    ),
    new Agency('78', 'SCAP Supported Housing', 'Ann', 'McCray', '518-275-8008'),
    new Agency(
      '79',
      'SCAP Supported Housing',
      'Barbara',
      'Garrett',
      '5183778539'
    ),
    new Agency('80', 'Schenectady Childrens Home', 'Amanda', 'Mitchell', ''),
    new Agency(
      '81',
      'Schenectady Community Action Program',
      'Jeanne',
      'Derwin',
      ''
    ),
    new Agency(
      '82',
      'Schenectady Community Action Program',
      'Ed',
      'Falterman',
      ''
    ),
    new Agency(
      '83',
      'Schenectady Community Action Program',
      'Meredith',
      'Gebell',
      ''
    ),
    new Agency(
      '84',
      'Schenectady Community Action Program',
      'Charlene',
      'Felix',
      '5183749181'
    ),
    new Agency(
      '85',
      'Schenectady Community Action Program',
      'Addy',
      'Haberbush',
      ' '
    ),
    new Agency(
      '86',
      'Schenectady Community Action Program',
      'Alicia',
      'Lewis',
      '  '
    ),
    new Agency(
      '87',
      'Schenectady Community Action Program',
      'Asia',
      'Madison',
      '518-347-5361'
    ),
    new Agency(
      '88',
      'Schenectady Community Action Program',
      'Elise',
      'Martin',
      ''
    ),
    new Agency('89', 'Schenectady Community Ministries', 'Shelly', 'Ford', ''),
    new Agency(
      '90',
      'Schenectady Community Ministries',
      'JoAnn',
      'Rafalik',
      ''
    ),
    new Agency(
      '91',
      'Schenectady Community Ministries',
      'Thomas',
      'Schofield',
      ''
    ),
    new Agency(
      '92',
      'Schenectady County Adult Protective Services',
      '',
      '',
      ''
    ),
    new Agency(
      '93',
      'Schenectady County DSS',
      'Anjanette',
      'Tucker',
      '518-391-1976'
    ),
    new Agency('94', 'Schenectady County DSS', '', '', ''),
    new Agency(
      '95',
      'Schenectady County DSS - Children & Family Services',
      'Nicole',
      'Wood',
      ''
    ),
    new Agency(
      '96',
      'Schenectady County Department of Long Term Care',
      'Kathleen',
      'Albert',
      '5183828481'
    ),
    new Agency(
      '97',
      'Schenectady County Department of Long Term Care',
      'Susan',
      'Wuest',
      ''
    ),
    new Agency(
      '98',
      'Schenectady County Public Health',
      'Adrianna',
      'Hodgson',
      '5186461453'
    ),
    new Agency(
      '99',
      'Schenectady County Public Health',
      'Nikki',
      'Tote',
      '5187308194'
    ),
    new Agency('100', 'SCSD Ready to Learn', 'Jeanne', 'Gallo', '5187287151'),
    new Agency(
      '101',
      'Schenectady High School',
      'Ellen',
      'Tremblay',
      '5188812044'
    ),
    new Agency('102', 'Scotia Glenville Food Pantry', 'Cindy', 'Gaige', ''),
    new Agency('103', 'St Anthonys Church', 'Doreen', 'Rossi', ''),
    new Agency(
      '104',
      'St Lukes Daily Bread Food Pantry',
      'MaryJane',
      'Smith',
      ''
    ),
    new Agency('105', 'St Lukes Daily Bread Food Pantry', 'Kathy', 'Spano', ''),
    new Agency('106', 'State Street Food Pantry', 'Maria', 'Delacruz', ''),
    new Agency('107', 'State Street Food Pantry', 'Minnie', 'Torres', ''),
    new Agency(
      '108',
      'Steinmetz School',
      'Michelle',
      'Thornhill',
      '518-878-5693'
    ),
    new Agency('109', 'Summit Towers', 'Barbara', 'McBride', ''),
    new Agency('110', 'The Bridge Food Pantry', 'Brita', 'Bookhout', ' '),
    new Agency(
      '111',
      'The Salvation Army of Schenectady',
      'Kelley',
      'Buckbee-Lutcher',
      ''
    ),
    new Agency('112', 'Van Corlaer School', 'Ryan', 'Saxton', ' '),
    new Agency(
      '113',
      'Washington Irving Educational Center',
      'Sue',
      'Steciak',
      '518-377-6530'
    ),
    new Agency('114', 'Young Parents United', 'Ginnie', 'Egan', ''),
    new Agency(
      '115',
      'Youth Advocate Program',
      'Kelsey',
      'Collins',
      '518-852-0563'
    ),
    new Agency('116', 'Youth Life Support Network', 'Francia', 'Rahiman', ''),
    new Agency('117', 'YWCA ', 'Demekia', 'Santana', ''),
  ];
}
