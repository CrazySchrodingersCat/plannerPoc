using API.Models;
using System.Drawing;

namespace API.Models
{
    public enum UserType
    {
        Client = 0,       
        PS = 1,
        LV = 2,
        CGT = 3,
        Regie = 4,
        Fysio = 5,
    }
}

public static class UserTypeExtensions
{
    private static readonly Dictionary<UserType, object> userTypeProperties = new Dictionary<UserType, object>()
    {
        { UserType.Client, new { Type = "Client",  Color = "#b5d2b4", Abbreviation = "Cl" } },
        { UserType.PS, new { Type = "Psycholoog (PS)", Color = "#d9a0a0", Abbreviation = "PS" } },
        { UserType.LV, new { Type = "Psycholoog(LV)", Color = "#efb9cb", Abbreviation = "LV" } },
        { UserType.CGT, new { Type = "Psycholoog (CGT)", Color = "#E6ADEC", Abbreviation = "CGT" } },
        { UserType.Regie, new { Type = "Regiebehandelaar", Color = "#C287E8", Abbreviation = "Rg" } },
        { UserType.Fysio, new { Type = "Fysiotherapeut", Color = "#807182", Abbreviation = "Ft" } }

    };

    public static string GetType(this UserType userType)
    {
        return ((dynamic)userTypeProperties[userType]).Type;
    }

    public static string GetColor(this UserType userType)
    {
        return ((dynamic)userTypeProperties[userType]).Color;
    }
    public static string GetAbbreviation(this UserType userType)
    {
        return ((dynamic)userTypeProperties[userType]).Abbreviation;
    }
}
