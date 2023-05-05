using API.Models;

namespace API.AppLogic.Services
{
    public class AgendaService
    {
        private readonly IAgendaRepository _agendaRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IPractitionerRepository _practitionerRepository;

        public AgendaService(IAgendaRepository agendaRepo, IClientRepository clientRepo, IPractitionerRepository practitionerRepo)
        {
            _agendaRepository = agendaRepo;
            _clientRepository = clientRepo;
            _practitionerRepository = practitionerRepo;

        }

        public async Task<AgendaItem?> GetById(string id)
        {
            return await _agendaRepository.GetByIdAsync(id);
        }

        public async Task<List<AgendaItem>?> GetByClientAsync(string id)
        {
            return await _agendaRepository.GetByClientIdAsync(id);
        } 
        public async Task<List<AgendaItem>?> GetByPractitionerAsync(string id)
        {
            return await _agendaRepository.GetByPractitionerIdAsync(id);
        }

        public async Task<List<AgendaItem>?> GetPeriodeForPractitionerAsync(string id, DateTime from, DateTime till)
        {
            return await _agendaRepository.GetByPeriodeForPractitionerAsync(id, from, till);
        }
        public async Task<List<AgendaItem>?> GetPeriodeForClientAsync(string id, DateTime from, DateTime till)
        {
            return await _agendaRepository.GetByPeriodeForClientAsync(id, from, till);
        }

        public async Task<List<AgendaItemDTO>?> GetDateForClientAsync(string id, DateTime date)
        {
            var agendaItems = await _agendaRepository.GetByDateForClientAsync(id, date);

            return await ConvertToDTOList(agendaItems);
        }


        public async Task<List<AgendaItemDTO>?> GetDateForPractitionerAsync(string id, DateTime date)
        {
            var agendaItems = await _agendaRepository.GetByDateForPractitionerAsync(id, date);
            return await ConvertToDTOList(agendaItems);
        }

        public async Task<List<AgendaItemDTO>?> GetWeekForClientAsync(string id, DateTime date)
        {
            var agendaItems = await _agendaRepository.GetWeekForClientAsync(id, date);
            return await ConvertToDTOList(agendaItems);
        }
        public async Task<List<AgendaItemDTO>?> GetWeekForPractitionerAsync(string id, DateTime date)
        {
            var agendaItems = await _agendaRepository.GetWeekForPractitionerAsync(id, date);
            return await ConvertToDTOList(agendaItems);
        }
        private async Task<List<AgendaItemDTO>?> ConvertToDTOList(List<AgendaItem>? agendaItems)
        {
            List<AgendaItemDTO> agendaItemDTOs = new List<AgendaItemDTO>();
            if (agendaItems != null)
            {
                foreach (var agendaItem in agendaItems)
                {
                    var practitioner = await _practitionerRepository.GetByIdAsync(agendaItem.PractitionerId);
                    var client = await _clientRepository.GetByIdAsync(agendaItem.ClientId);

                    var agendaItemDTO = new AgendaItemDTO
                    {
                        Id = agendaItem.Id,
                        Practitioner = practitioner,
                        Client = client,
                        Date = agendaItem.Date,
                        StartTime = agendaItem.StartTime,
                        EndTime = agendaItem.EndTime
                    };

                    agendaItemDTOs.Add(agendaItemDTO);
                }
            }

            return agendaItemDTOs;
        }
    }
}
