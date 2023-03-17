using API.Models;

namespace API.AppLogic.Services
{
    public class ClientService
    {
        private readonly IClientRepository _clientRepository;
        public ClientService(IClientRepository repo)
        {
            _clientRepository = repo;
        }

        public async Task<List<Client>> GetClients()
        {
            return await _clientRepository.GetAllAsync();

        }

        public async Task<Client?> GetClientById(string id)
        {
            return await _clientRepository.GetByIdAsync(id);
        }

    }
}
