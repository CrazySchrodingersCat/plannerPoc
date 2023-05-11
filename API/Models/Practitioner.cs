using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Practitioner
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? DisplayName { get; set; }

    public string? Discipline { get; set; }
    public UserType UserType { get; }

    public Practitioner(string displayName, string discipline )
    {
        DisplayName = displayName;
        Discipline = discipline;
        switch (discipline)
        {
            case "Psycholoog (PS)":
                UserType = UserType.PS;
                break;
            case "Psycholoog(LV)":
                UserType = UserType.LV;
                break;
            case "Psycholoog (CGT)":
                UserType = UserType.CGT;
                break;
            case "Regiebehandelaar":
                UserType = UserType.Regie;
                break;
            default:
                UserType = UserType.Fysio;
                break;
        }
    }

   
}
