using API.AppLogic.Services;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendaController : ControllerBase
    {

        private readonly ILogger<AgendaController> _logger;
        private readonly AgendaService _agendaService;

        public AgendaController(ILogger<AgendaController> logger, AgendaService service)
        {
            _logger = logger;
            _agendaService = service;
        }
        //// GET: api/<AgendaController>
        //[HttpGet]
        //public async Task<IActionResult> GetAll()
        //{
        //    var items = await _agendaService.GetAll();
        //    return items == null ? NotFound() : Ok(items);
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointmentById(string id)
        {
            var appointment = await _agendaService.GetById(id);
            return appointment == null ? NotFound() : Ok(appointment);
        }
        //[Route("/Client")]
        [HttpGet("/Client/{id}/Periode/{from}/{till}")]
        public async Task<IActionResult> GetAppointmentsByClientIdForPeriode(string id, DateTime from, DateTime till)
        {
            var appointments = await _agendaService.GetPeriodeForClientAsync(id, from, till);
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("/Practitioner/{id}/Periode/{from}/{till}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdForPeriode(string id, DateTime from, DateTime till)
        {
            var appointments = await _agendaService.GetPeriodeForPractitionerAsync(id, from, till);
            return appointments == null ? NotFound() : Ok(appointments);
        }

        //[Route("/Client")]
        [HttpGet("/Client/{id}/Date/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByClientIdForDate(string id, string dateInput)
        {
            var appointments = await _agendaService.GetDateForClientAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("/Practitioner/{id}/Date/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdForDate(string id, string dateInput)
        {
            
            var appointments = await _agendaService.GetDateForClientAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }

        // POST api/<AgendaController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<AgendaController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<AgendaController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
