using API.Models;
using static API.AppLogic.Services.PractitionerService;

namespace API.AppLogic
{
    public interface IPractitionerRepository
    {
        Task<List<Practitioner>> GetAllAsync();
        Task<List<Practitioner>> GetByDisciplineAsync(string discipline);
        Task<Practitioner?> GetByIdAsync(string id); 
        Task AddPractitioner(Practitioner newPractitioner);
        Task EditPractitioner(string id, PractitionerRequestDTO update);
        Task DeletePractitionerAsync(string id);
    }
}
