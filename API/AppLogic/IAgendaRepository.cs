using API.Models;
using static API.AppLogic.Services.AgendaService;

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
        Task<List<AgendaItem>?> GetByDateForClientAsync(string id, DateTime date);
        Task<List<AgendaItem>?> GetByDateForPractitionerAsync(string id, DateTime date);
        Task<List<AgendaItem>?> GetWeekForPractitionerAsync(string id, DateTime date);
        Task<List<AgendaItem>?> GetWeekForClientAsync(string id, DateTime date);
        Task EditItem(string id, AgendaItemRequestDTO request);
    }
}
