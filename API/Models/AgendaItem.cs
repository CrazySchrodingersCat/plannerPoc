using System;
using System.Collections.Generic;

namespace API.Models;

public partial class AgendaItem
{
    public string Id { get; set; } = null!;

    public string? ClientId { get; set; }

    public string? PractitionerId { get; set; }

    public DateTime? Date { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? EndTime { get; set; }
}
