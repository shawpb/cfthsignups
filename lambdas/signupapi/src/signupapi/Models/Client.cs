using System;

public class Client
{
    public string Id;
    public string FirstName;
    public string LastName;
    public string StreetAddress;
    public string AptNum;
    public string City;
    public string Zip;
    public string Email;
    public string Phone;
    public int FamilySize;

    public bool HeapLetter;
    public bool CommunityReferral;
    public bool BenefitCard;
    public bool SSILetter;
    public bool WICCard;
    public bool Unemployment;
    public bool MuniHousing;
    public bool SsdLetter;

    public string WhoDelivers;
    public string AlternateFirstName;
    public string AlternateLastName;
    public string AlternatePhone;

    public string Agency;
    public string AgencyRepFirstName;
    public string AgencyRepLastName;
    public DateTime CreatedTimestamp { get; set; }
}