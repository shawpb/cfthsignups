import { Injectable } from '@angular/core';
import { Agency } from '../Models/agency';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  Agencylist: Agency[] = [
    new Agency(
      '7c9f0217-dc3a-4f70-8332-323138e8d65a',
      'Food Provider',
      'Jones',
      'Peter',
      '518-234-2345'
    ),
  ];

  constructor() {}

  GetAgencyByPassword(password: string): Agency {
    let selectedAgency: Agency;

    switch (password) {
      case 'supersecret': {
        selectedAgency = this.Agencylist[0];
        break;
      }
      default: {
        selectedAgency = null;
        break;
      }
    }

    return selectedAgency;
  }

  GetAgency(agencyKey: string): Agency {
    let selectedAgency: Agency;

    switch (agencyKey) {
      case this.Agencylist[0].id: {
        selectedAgency = this.Agencylist[0];
        break;
      }
      default: {
        selectedAgency = null;
        break;
      }
    }

    return selectedAgency;
  }

  GetCurrentAgency(): Agency {
    const aId = sessionStorage.getItem('aId');
    let currentAgency: Agency;

    if (aId !== undefined && aId !== null && aId !== '') {
      currentAgency = this.GetAgency(aId);
    }

    return currentAgency;
  }

  SetCurrentAgency(aId: string): void {
    sessionStorage.setItem('aId', aId);
  }

  Logout(): void {
    sessionStorage.removeItem('aId');
  }
}
