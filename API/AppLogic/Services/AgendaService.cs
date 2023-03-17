using API.Models;

namespace API.AppLogic.Services
{
    public class AgendaService
    {
        private readonly IAgendaRepository _agendaRepository;

        public AgendaService(IAgendaRepository repository)
        {
            _agendaRepository = repository;
        }

        //public async Task<List<AgendaItem>> GetAll()
        //{
        //    return await _agendaRepository.GetAllAsync();
        //}

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


    }
}
