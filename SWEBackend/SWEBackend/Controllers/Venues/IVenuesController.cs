using SWEBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Venues
{
    public interface IVenuesController
    {
        public Task<List<Venue>> GetVenuesAsync();
        public Task<Venue> GetVenueAsync(int id);
        public Task<Venue> CreateVenueAsync(Venue venue);
        public Task<Venue> UpdateVenueAsync(Venue venue);
        public Task<int> DeleteVenueAsync(int id);
    }
}
