using API.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.AppLogic
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly PlannerDbContext _context;

        public AgendaRepository(PlannerDbContext context)
        {
            _context = context;
        }
        //public async Task<List<AgendaItem>> GetAllAsync()
        //{
        //    return await _context.AgendaItems.ToListAsync();
        //}

        public async Task<AgendaItem?> GetByIdAsync(string id)
        {
            return await _context.AgendaItems.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<AgendaItem>?> GetByClientIdAsync(string id)
        {
            return await _context.AgendaItems.Where(item=> item.ClientId == id).ToListAsync();
        }
        public async Task<List<AgendaItem>?> GetByPractitionerIdAsync(string id)
        {
            return await _context.AgendaItems.Where(item => item.PractitionerId == id).ToListAsync();
        }

      


        public async Task<List<AgendaItem>?> GetByPeriodeForClientAsync(string id, DateTime fromDate, DateTime tillDate)
        {
            return await _context.AgendaItems
                .Where(item => item.ClientId == id && item.Date >= fromDate && item.Date <=tillDate).ToListAsync();
        }

        public async Task<List<AgendaItem>?> GetByPeriodeForPractitionerAsync(string id, DateTime fromDate, DateTime tillDate)
        {
            return await _context.AgendaItems
                .Where(item => item.PractitionerId == id && item.Date >= fromDate && item.Date <= tillDate).ToListAsync();
        }
        public async Task<List<AgendaItem>?> GetByDateForClientAsync(string id, DateTime date)
        { 
            return await _context.AgendaItems.Where(item => item.ClientId == id && item.Date == date).ToListAsync();
        }
        public async Task<List<AgendaItem>?> GetByDateForPractitionerAsync(string id, DateTime date)
        {
            return await _context.AgendaItems.Where(item => item.PractitionerId == id && item.Date == date).ToListAsync();
        }
    }
}
