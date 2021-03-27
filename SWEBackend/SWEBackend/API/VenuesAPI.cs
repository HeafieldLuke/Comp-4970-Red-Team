using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.Venues;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/venues")]
    public class VenuesAPI : ControllerBase
    {
        private readonly IVenuesController _venuesController;

        public VenuesAPI(IVenuesController venuesController)
            => _venuesController = venuesController;

        [HttpGet]
        public async Task<List<Venue>> GetVenuesAsync()
            => await _venuesController.GetVenuesAsync();

        [HttpGet("{id}")]
        public async Task<Venue> GetVenueAsync(int id)
            => await _venuesController.GetVenueAsync(id);

        [HttpPost]
        public async Task<Venue> PostVenueAsync([FromBody] Venue venue)
            => await _venuesController.CreateVenueAsync(venue);

        [HttpPut]
        public async Task<Venue> PutVenueAsync([FromBody] Venue venue)
            => await _venuesController.UpdateVenueAsync(venue);

        [HttpDelete("{id}")]
        public async Task<int> DeleteVenueAsync(int id)
            => await _venuesController.DeleteVenueAsync(id);
    }
}
