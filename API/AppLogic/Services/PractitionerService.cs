using API.Models;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Security.Cryptography;

namespace API.AppLogic.Services
{
    public class PractitionerService
    {

        private readonly IPractitionerRepository _repository;
        public PractitionerService(IPractitionerRepository repo)
        {
            _repository = repo;
        }
        public async Task<List<Practitioner>> GetPractititoners()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<List<Practitioner>> GetPractitionersByDisciplineAsync(string discipline)
        {
            return await _repository.GetByDisciplineAsync(discipline);
        }

        public async Task<Practitioner?> GetPractitionersByIdAsync(string id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Practitioner> AddPractitionerAsync(PractitionerRequestDTO request)
        {
            Practitioner newPractitioner = new Practitioner(request.DisplayName,request.Discipline );
            await _repository.AddPractitioner(newPractitioner);
            return newPractitioner;                
        }

        public async Task DeletePractitionerById(string id)
        {
            await _repository.DeletePractitionerAsync(id);
            
        }

        public async Task<Practitioner?> EditPractitionerAsync(string id, PractitionerRequestDTO request)
        {
            
            var toUpdate  = await _repository.GetByIdAsync(id);
            if (toUpdate == null)
            {
                throw new ArgumentException("Practitioner not found");
            }else
            {
                //var updated = new Practitioner(request.DisplayName, request.Discipline);
                await _repository.EditPractitioner(id,request);
            }
            return await _repository.GetByIdAsync(id);
        }

        public record PractitionerRequestDTO(string DisplayName, string Discipline) { }
        
    }
}