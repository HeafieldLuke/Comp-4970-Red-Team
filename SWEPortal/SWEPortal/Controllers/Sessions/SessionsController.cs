using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace SWEBackend.Controllers.Sessions
{
    public class SessionsController : ISessionsController
    {
        private readonly ILogger<ISessionsController> _logger;
        private readonly ApplicationDbContext _context;

        public SessionsController(ILogger<ISessionsController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<Session> CreateSessionAsync(Session session)
        {
            try
            {
                await _context.Sessions.AddAsync(session);
                
                await _context.SaveChangesAsync();
                return session;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Session();
            }
        }

        public async Task<int> DeleteSessionAsync(Guid id)
        {
            var session = await _context.Sessions.FirstOrDefaultAsync(f => f.Id == id);

            if (session != null)
            {
                try
                {
                    _context.Sessions.Remove(session);
                    
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

        public async Task<List<Session>> GetSessionsAsync(Guid? venueId)
        {
            if (venueId.HasValue)
                return await _context.Sessions.Where(f => f.Room.VenueId.HasValue).Where(f => f.Room.VenueId == venueId).ToListAsync();
            return await _context.Sessions.ToListAsync();
        }

        public async Task<Session> GetSessionAsync(Guid id)
            => await _context.Sessions.FirstOrDefaultAsync(f => f.Id == id);

        public async Task<Session> UpdateSessionAsync(Session session)
        {
            try
            {
                _context.Sessions.Update(session);
                
                await _context.SaveChangesAsync();
                return session;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Session();
            }
        }
    }
}
