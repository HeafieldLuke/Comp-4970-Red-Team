using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace SWEBackend.Controllers.SessionCounts
{
    public class SessionCountsController : ISessionCountsController
    {
        private readonly ILogger<ISessionCountsController> _logger;
        private readonly ApplicationDbContext _context;

        public SessionCountsController(ILogger<ISessionCountsController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<SessionCount> CreateSessionCountAsync(SessionCount sessionCount)
        {
            try
            {
                await _context.SessionCounts.AddAsync(sessionCount);
                
                await _context.SaveChangesAsync();
                return sessionCount;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new SessionCount();
            }
        }

        public async Task<int> DeleteSessionCountAsync(Guid id)
        {
            var sessionCount = await _context.SessionCounts.FirstOrDefaultAsync(f => f.Id == id);

            if (sessionCount != null)
            {
                try
                {
                    _context.SessionCounts.Remove(sessionCount);
                    
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

        public async Task<List<SessionCount>> GetSessionCountsAsync(Guid id)
            => await _context.SessionCounts.Where(f => f.SessionId == id).ToListAsync();

        public async Task<SessionCount> UpdateSessionCountAsync(SessionCount sessionCount)
        {
            try
            {
                _context.SessionCounts.Update(sessionCount);
                
                await _context.SaveChangesAsync();
                return sessionCount;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new SessionCount();
            }
        }
    }
}
