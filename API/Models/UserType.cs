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
        { UserType.Client, new { Type = "Client", Color = "#b5d2b4" } },
        { UserType.PS, new { Type = "Psycholoog (PS)", Color = "#d9a0a0" } },
        { UserType.LV, new { Type = "Psycholoog(LV)", Color = "#efb9cb" } },
        { UserType.CGT, new { Type = "Psycholoog (CGT)", Color = "#E6ADEC" } },      
        { UserType.Regie, new { Type = "Regiebehandelaar", Color = "#C287E8" } },
        { UserType.Fysio, new { Type = "Fysiotherapeut", Color = "#807182" } }
    };

    public static string GetType(this UserType userType)
    {
        return ((dynamic)userTypeProperties[userType]).Type;
    }

    public static string GetColor(this UserType userType)
    {
        return ((dynamic)userTypeProperties[userType]).Color;
    }
}
//  --color-client: #b5d2b4; /* ach gray */
//  --color - 2: #d9a0a0; /* mimi pink */
//  --color - 3: #efb9cb; /* orchid pink */
//  --color - 4: #E6ADEC; /* plum web */
//  --color - Regiebehandelaar: #C287E8; /* lavander floral */
//  --color - Fysiotherapeut: #807182; /* roze */