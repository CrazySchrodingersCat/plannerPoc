using API.AppLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ILogger <ClientController> _logger;
        private readonly ClientService _service;

        public ClientController(ILogger<ClientController> logger, ClientService service)
        {
            _logger = logger;          
           _service = service;
        }
        // GET: api/<ClientController>
        [HttpGet]
        public  async Task<IActionResult> GetAll()
        {
           var clients  =  await _service.GetClients();
           return Ok(clients);
        }

        // GET api/<ClientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(string id)
        {
            var client = await _service.GetClientById(id);
            if(client == null)
            {
                return BadRequest("No client with id " + id);
            }
            return Ok(client);
        }      
    }
}
