export class Agency {
  constructor(
    agencyId: string,
    agencyName: string,
    cLastName: string,
    cFirstName: string,
    cPhone: string
  ) {
    this.id = agencyId;
    this.name = agencyName;
    this.contactLastName = cLastName;
    this.contactFirstName = cFirstName;
    this.contactPhone = cPhone;
  }

  id: string;
  name: string;
  contactLastName: string;
  contactFirstName: string;
  contactPhone: string;
}
