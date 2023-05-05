using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Practitioner
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string? DisplayName { get; set; }

    public string? Discipline { get; set; }
    public string UserType { get; } = "practitioner";

    public Practitioner(string displayName, string discipline )
    {
        DisplayName = displayName;
        Discipline = discipline;
    }

   
}
