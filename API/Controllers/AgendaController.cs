using API.AppLogic.Services;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;
using static API.AppLogic.Services.AgendaService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/")]
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
   
        //[Route("/Client")]
        [HttpGet("Client/{id}/Periode/{from}/{till}")]
        public async Task<IActionResult> GetAppointmentsByClientIdForPeriode(string id, DateTime from, DateTime till)
        {
            var appointments = await _agendaService.GetPeriodeForClientAsync(id, from, till);
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("Practitioner/{id}/Periode/{from}/{till}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdForPeriode(string id, DateTime from, DateTime till)
        {
            var appointments = await _agendaService.GetPeriodeForPractitionerAsync(id, from, till);
            return appointments == null ? NotFound() : Ok(appointments);
        }

        //[Route("/Client")]
        [HttpGet("Client/{id}/Date/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByClientIdForDate(string id, string dateInput)
        {
            var appointments = await _agendaService.GetDateForClientAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("Practitioner/{id}/Date/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdForDate(string id, string dateInput)
        {
            
            var appointments = await _agendaService.GetDateForPractitionerAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }

        //[Route("/Client")]
        [HttpGet("Client/{id}/Week/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByClientIdForWeek(string id, string dateInput)
        {
            var appointments = await _agendaService.GetWeekForClientAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("Practitioner/{id}/Week/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdForWeek(string id, string dateInput)
        {

            var appointments = await _agendaService.GetWeekForPractitionerAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }

        //[Route("/Client")]
        [HttpGet("Client/{id}/Months/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByClientIdFor2Month(string id, string dateInput)
        {
            var appointments = await _agendaService.Get2MonthForClientAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }
        //[Route("/Practitioner")]
        [HttpGet("Practitioner/{id}/Months/{dateInput}")]
        public async Task<IActionResult> GetAppointmentsByPractitionerIdFor2Month(string id, string dateInput)
        {

            var appointments = await _agendaService.Get2MonthForPractitionerAsync(id, DateTime.Parse(dateInput));
            return appointments == null ? NotFound() : Ok(appointments);
        }

        // POST api/<AgendaController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<AgendaController>/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult>  EditItem(string id, [FromBody]  AgendaItemRequestDTO request)
        //{
        //    try
        //    {
        //        await _agendaService.EditItemAsync(id, request);
        //        return Ok();
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return NotFound(ex.Message);
        //    }
        //}

        //// DELETE api/<AgendaController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
