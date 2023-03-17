using API.Models;

namespace API.AppLogic
{
    public interface IClientRepository
    {
        Task<List<Client>> GetAllAsync();
        Task<Client?> GetByIdAsync(string id);
    }
}
