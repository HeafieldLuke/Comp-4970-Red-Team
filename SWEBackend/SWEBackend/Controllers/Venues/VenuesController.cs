using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace SWEBackend.Controllers.Venues
{
    public class VenuesController : IVenuesController
    {
        private readonly ILogger<IVenuesController> _logger;
        private readonly ApplicationDbContext _context;

        public VenuesController(ILogger<IVenuesController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<Venue> CreateVenueAsync(Venue venue)
        {
            try
            {
                await _context.Venues.AddAsync(venue);
                
                await _context.SaveChangesAsync();
                return venue;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Venue();
            }
        }

        public async Task<int> DeleteVenueAsync(int id)
        {
            var venue = await _context.Venues.FirstOrDefaultAsync(f => f.Id == id);

            if (venue != null)
            {
                try
                {
                    _context.Venues.Remove(venue);
                    
                    await _context.SaveChangesAsync();
                    return StatusCodes.Status200OK;
                }
                catch (Exception ex)
                {
                    _logger.Log(LogLevel.Error, ex.ToString());
                    return StatusCodes.Status500InternalServerError;
                }
            }

            return StatusCodes.Status404NotFound;
        }

        public async Task<List<Venue>> GetVenuesAsync()
            => await _context.Venues.ToListAsync();

        public async Task<Venue> GetVenueAsync(int id)
            => await _context.Venues.FirstOrDefaultAsync(f => f.Id == id);

        public async Task<Venue> UpdateVenueAsync(Venue venue)
        {
            try
            {
                _context.Venues.Update(venue);
                
                await _context.SaveChangesAsync();
                return venue;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Venue();
            }
        }
    }
}
