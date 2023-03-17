using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Practitioner
{
    public string Id { get; set; } = null!;

    public string? DisplayName { get; set; }

    public string? Discipline { get; set; }

    public Practitioner(string displayName, string discipline )
    {
        Id = Guid.NewGuid().ToString();
        DisplayName = displayName;
        Discipline = discipline;
    }

    //public enum Discipline
    //{
    //}
}
