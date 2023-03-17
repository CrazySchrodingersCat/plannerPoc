using System;
using System.Collections.Generic;

namespace API.Models;

public partial class Client
{
    public string Id { get; set; } = null!;

    public string? DisplayName { get; set; }
}
