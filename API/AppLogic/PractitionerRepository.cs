using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Concurrent;
using static API.AppLogic.Services.PractitionerService;

namespace API.AppLogic
{
    public class PractitionerRepository : IPractitionerRepository
    {

        private readonly PlannerDbContext _context;
        public PractitionerRepository(PlannerDbContext plannerDbContext)
        {
            _context = plannerDbContext;
        }

        public Task AddPractitioner(Practitioner newPractitioner)
        {
            _context.Practitioners.Add(newPractitioner);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public async Task DeletePractitionerAsync(string id)
        {
            var practitioner  = _context.Practitioners.Single(x => x.Id == id);
            if (practitioner != null)
            {
                _context.Practitioners.Remove(practitioner);
                await _context.SaveChangesAsync();
            }
            else throw new Exception("Practitioner with id " + id + " not found");            
        }

        public async Task EditPractitioner(string id,PractitionerRequestDTO update)
        {
            var practitioner = _context.Practitioners.Single(x => x.Id == id);
            if(practitioner != null)
            {
                practitioner.DisplayName = update.DisplayName;
                practitioner.Discipline = update.Discipline;
                await _context.SaveChangesAsync();
            } 
            else throw new Exception("Practitioner with id " + id + " not found");
        }

        public async Task<List<Practitioner>> GetAllAsync()
        {
            return await _context.Practitioners.ToListAsync();
        }

        public async Task<List<Practitioner>> GetByDisciplineAsync(string discipline)
        {
            return await _context.Practitioners.Where(pr=> pr.Discipline == discipline).ToListAsync();
        }

        public async Task<Practitioner?> GetByIdAsync(string id)
        {
            return await _context.Practitioners.FirstOrDefaultAsync(pr => pr.Id == id);
        }
    }
}
