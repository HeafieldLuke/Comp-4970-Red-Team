using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace SWEBackend.Controllers.Speakers
{
    public class SpeakersController : ISpeakersController
    {
        private readonly ILogger<ISpeakersController> _logger;
        private readonly ApplicationDbContext _context;

        public SpeakersController(ILogger<ISpeakersController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<Speaker> CreateSpeakerAsync(Speaker speaker)
        {
            try
            {
                await _context.Speakers.AddAsync(speaker);
                
                await _context.SaveChangesAsync();
                return speaker;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Speaker();
            }
        }

        public async Task<int> DeleteSpeakerAsync(Guid id)
        {
            var speaker = await _context.Speakers.FirstOrDefaultAsync(f => f.Id == id);

            if (speaker != null)
            {
                try
                {
                    _context.Speakers.Remove(speaker);
                    
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

        public async Task<List<Speaker>> GetSpeakersAsync()
            => await _context.Speakers.ToListAsync();

        public async Task<Speaker> GetSpeakerAsync(Guid id)
            => await _context.Speakers.FirstOrDefaultAsync(f => f.Id == id);

        public async Task<Speaker> UpdateSpeakerAsync(Speaker speaker)
        {
            try
            {
                _context.Speakers.Update(speaker);
                
                await _context.SaveChangesAsync();
                return speaker;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Speaker();
            }
        }
    }
}
