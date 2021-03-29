using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Venues
{
    public interface IVenuesController
    {
        public Task<List<Venue>> GetVenuesAsync();
        public Task<Venue> GetVenueAsync(Guid id);
        public Task<Venue> CreateVenueAsync(Venue venue);
        public Task<Venue> UpdateVenueAsync(Venue venue);
        public Task<int> DeleteVenueAsync(Guid id);
    }
}
