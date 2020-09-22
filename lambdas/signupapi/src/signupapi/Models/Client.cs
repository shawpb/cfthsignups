using System;

public class Client
{
    public string Id;
    public string FirstName;
    public string LastName;
    public string StreetAddress;
    public string City;
    public string Zip;
    public string Email;
    public string Phone;
    public int FamilySize;

    public QualifyingId[] FormsOfId;

    public string AlternateFirstName;
    public string AlternateALastName;
    public string AlternatePhone;
    public DateTime CreatedTimestamp { get; set; }
}