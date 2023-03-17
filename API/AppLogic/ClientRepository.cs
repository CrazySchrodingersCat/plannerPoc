using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.AppLogic
{
    public class ClientRepository : IClientRepository
    {

        private readonly PlannerDbContext _context;

        public ClientRepository(PlannerDbContext plannerDbContext)
        {
            _context = plannerDbContext;
        }
        public async Task<List<Client>> GetAllAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client?> GetByIdAsync(string id)
        {
            return await _context.Clients.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
