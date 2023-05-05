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

        public async Task<List<AgendaItem>?> GetWeekForPractitionerAsync(string id, DateTime date)
        {
      
            var manday = date.AddDays(-(date.DayOfWeek - DayOfWeek.Monday));
    
            return await _context.AgendaItems
                 .Where(item => item.PractitionerId == id && 
                 item.Date >= manday && item.Date <= manday.AddDays(7)).ToListAsync();
        }

        public async Task<List<AgendaItem>?> GetWeekForClientAsync(string id, DateTime date)
        {
            var manday = date.AddDays(-(date.DayOfWeek - DayOfWeek.Monday));

            return await _context.AgendaItems
                 .Where(item => item.ClientId == id &&
                 item.Date >= manday && item.Date < manday.AddDays(7)).ToListAsync();
        }

        //public static class DateTimeExtensions
        //{
        //    public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek = DayOfWeek.Monday)
        //    {
        //        int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
        //        return dt.AddDays(-1 * diff).Date;
        //    }
        //}
    }
}
