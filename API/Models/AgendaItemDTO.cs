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

        public double Duration
        {
            get
            {
                var hours = EndTime != null && StartTime != null ? (int)(EndTime.Value - StartTime.Value).Hours : 0;
                var minutes = EndTime != null && StartTime != null ? (int)(EndTime.Value - StartTime.Value).Minutes : 0;
                if (minutes < 15) return hours;
                if (minutes < 30) return hours + 0.25;
                if (minutes < 45) return hours + 0.5;
                if (minutes < 59) return hours + 0.75;

                return hours + 1;
            }
        }
        public double Start {
            get
            {
            if (StartTime == null) return 0;

            var hours = StartTime.Value.Hours;
            var minutes = StartTime.Value.Minutes;

            if (minutes < 15) return hours;
            if (minutes < 30) return hours + 0.25;
            if (minutes < 45) return hours + 0.5;
            if (minutes < 59) return hours + 0.75;

            return hours + 1;
        }
    }
}
}
