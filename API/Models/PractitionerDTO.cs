namespace API.Models
{
    public class PractitionerDTO
    {
        public string Id { get; set; } = null;

        public string? DisplayName { get; set; }

        public string? Discipline { get; set; }
        public string? DisciplineAbbreviation { get; set; }


        public UserType UserType { get; }

        public PractitionerDTO(Practitioner practitioner)
        {
            Id = practitioner.Id;
            DisplayName = practitioner.DisplayName;
            
            //UserType = UserType.GetType();
            Discipline = practitioner.Discipline;
            switch (practitioner.Discipline)
            {
                case "Psycholoog (PS)":
                    UserType = UserType.PS;
                    DisciplineAbbreviation = "PS";
                    break;
                case "Psycholoog(LV)":
                    UserType = UserType.LV;
                    DisciplineAbbreviation = "LV";
                    break;
                case "Psycholoog (CGT)":
                    UserType = UserType.CGT;
                    DisciplineAbbreviation = "CGT";
                    break;
                case "Regiebehandelaar":
                    UserType = UserType.Regie;
                    DisciplineAbbreviation = "Rg";
                    break;
                default:
                    UserType = UserType.Fysio;
                    DisciplineAbbreviation = "Fs";
                    break;
            }

        }

    }
}
