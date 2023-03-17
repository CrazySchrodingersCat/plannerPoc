using API.AppLogic.Services;
using Microsoft.AspNetCore.Mvc;
using static API.AppLogic.Services.PractitionerService;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PractitionerController : ControllerBase
    {

        private readonly ILogger<ClientController> _logger;
        private readonly PractitionerService _service;

        public PractitionerController(ILogger<ClientController> logger, PractitionerService service)
        {
            _logger = logger;
            _service = service;
        }
        // GET: api/<PractitionerController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _service.GetPractititoners();
            return list == null ? NotFound() : Ok(list);
        }

       
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var practitioner = await _service.GetPractitionersByIdAsync(id);
            return practitioner == null ? NotFound() : Ok(practitioner);
        }
        
        [HttpGet("/Discipline/{discipline}")]
        public async Task<IActionResult> GetByDiscipline(string discipline)
        {
            var list = await _service.GetPractitionersByDisciplineAsync(discipline);
            return list == null ? NotFound() : Ok(list);
        }

        // POST api/<PractitionerController>
        [HttpPost]
        public async Task<IActionResult> CreatePractitioner([FromBody] PractitionerRequestDTO request)
        {
            var practitioner = await _service.AddPractitionerAsync(request);
            if (practitioner == null) { return BadRequest("request for practitioner not complete"); }
            return Ok(practitioner);

        }

        // PUT api/<PractitionerController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> EditPractitioner(string id, [FromBody] PractitionerRequestDTO request)
        {
            try
            {
                await _service.EditPractitionerAsync(id, request);
                return Ok();
            } catch (ArgumentException ex) 
            { 
                return NotFound(ex.Message);
            }
        }

        // DELETE api/<PractitionerController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePractitioner(string id)
        {
            await _service.DeletePractitionerById(id);
            return Ok();
        }

    }
}
