using API.Models;

namespace API.AppLogic
{
    public interface IAgendaRepository
    {
        //Task<List<AgendaItem>> GetAllAsync();
       
        Task<AgendaItem?> GetByIdAsync(string id);
        Task<List<AgendaItem>?> GetByClientIdAsync(string id);
        Task<List<AgendaItem>?> GetByPractitionerIdAsync(string id);
        Task<List<AgendaItem>?> GetByPeriodeForPractitionerAsync(string id, DateTime fromDate, DateTime tillDate);
        Task<List<AgendaItem>?> GetByPeriodeForClientAsync(string id, DateTime fromDate, DateTime tillDate);
    }
}
