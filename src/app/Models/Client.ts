export class Client {
  public Id: string;
  public ClientId: string;
  public FirstName: string;
  public LastName: string;
  public StreetAddress: string;
  public AptNum: string;
  public City: string;
  public Zip: string;
  public Email: string;
  public Phone: string;
  public FamilySize: number;
  public HeapLetter: boolean;
  public CommunityReferral: boolean;
  public BenefitCard: boolean;
  public SSILetter: boolean;
  public WICCard: boolean;
  public Unemployment: boolean;
  public MuniHousing: boolean;
  public SsdLetter: boolean;
  public WhoDelivers: string;
  public AlternateFirstName: string;
  public AlternateLastName: string;
  public AlternatePhone: string;
  public Agency: string;
  public AgencyRepFirstName: string;
  public AgencyRepLastName: string;
  public isVeteran: boolean;
  public isDriving: boolean;

  constructor() {
    this.isVeteran = false;
    this.isDriving = false;
  }
}
