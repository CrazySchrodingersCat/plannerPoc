using API.AppLogic.Services;
using API.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Concurrent;
using static API.AppLogic.Services.AgendaService;
using System;
using System.Linq;

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
            return await _context.AgendaItems.Where(item => item.ClientId == id && item.Date == date).OrderBy(i => i.StartTime).ToListAsync();
        }
        public async Task<List<AgendaItem>?> GetByDateForPractitionerAsync(string id, DateTime date)
        {
            return await _context.AgendaItems.Where(item => item.PractitionerId == id && item.Date == date).OrderBy(i=>i.StartTime).ToListAsync();
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


        public async Task<List<AgendaItem>?> Get2MonthForPractitionerAsync(string id, DateTime date)
        {
            DateTime firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            return await _context.AgendaItems
                 .Where(item => item.PractitionerId == id &&
                 item.Date >= firstDayOfMonth.AddDays(-7) && item.Date < firstDayOfMonth.AddDays(40)).ToListAsync();
        }

        public async Task<List<AgendaItem>?> Get2MonthForClientAsync(string id, DateTime date)
        {           
            DateTime firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
            return await _context.AgendaItems
                 .Where(item => item.ClientId == id &&
                 item.Date >= firstDayOfMonth.AddDays(-7) && item.Date < firstDayOfMonth.AddDays(40)).ToListAsync();
        }


        public async Task EditItem(string id, AgendaItemRequestDTO update)
        {

            var startSpan = ConvertStringToTimeSpan(update.Start);
            var endSpan = ConvertStringToTimeSpan(update.End);
            var item = _context.AgendaItems.Single(x => x.Id == id);
            if (item != null)
            {
                item.StartTime = startSpan;
                item.EndTime = endSpan;
                await _context.SaveChangesAsync();
            }
            else throw new Exception("Item with id " + id + " not found");
        }
        public TimeSpan ConvertStringToTimeSpan(string timeString)
        {
            TimeSpan timeSpan;

            if (TimeSpan.TryParse(timeString, out timeSpan))
            {
                // de conversie is gelukt, retourneer de timeSpan-waarde
                return timeSpan;
            }
            else
            {
                // de conversie is mislukt, retourneer een standaardwaarde
                return TimeSpan.Zero;
            }
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
