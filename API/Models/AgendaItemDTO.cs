namespace API.Models
{
    public class AgendaItemDTO
    {
        public string Id { get; set; } = null!;

        public Client? Client { get; set; }
        //public string? ClientName { get; set; }

        public Practitioner? Practitioner { get; set; }
        //public string? PractitionerName { get; set; }

        public DateTime? Date { get; set; }

        public TimeSpan? StartTime { get; set; }

        public TimeSpan? EndTime { get; set; }
    }
}
