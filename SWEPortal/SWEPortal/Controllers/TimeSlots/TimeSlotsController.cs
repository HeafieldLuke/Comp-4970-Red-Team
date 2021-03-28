using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace SWEBackend.Controllers.TimeSlots
{
    public class TimeSlotsController : ITimeSlotsController
    {
        private readonly ILogger<ITimeSlotsController> _logger;
        private readonly ApplicationDbContext _context;

        public TimeSlotsController(ILogger<ITimeSlotsController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<TimeSlot> CreateTimeSlotAsync(TimeSlot timeSlot)
        {
            try
            {
                await _context.TimeSlots.AddAsync(timeSlot);
                
                await _context.SaveChangesAsync();
                return timeSlot;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new TimeSlot();
            }
        }

        public async Task<int> DeleteTimeSlotAsync(Guid id)
        {
            var timeSlot = await _context.TimeSlots.FirstOrDefaultAsync(f => f.Id == id);

            if (timeSlot != null)
            {
                try
                {
                    _context.TimeSlots.Remove(timeSlot);
                    
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

        public async Task<List<TimeSlot>> GetTimeSlotsAsync()
            => await _context.TimeSlots.ToListAsync();

        public async Task<TimeSlot> GetTimeSlotAsync(Guid id)
            => await _context.TimeSlots.FirstOrDefaultAsync(f => f.Id == id);

        public async Task<TimeSlot> UpdateTimeSlotAsync(TimeSlot timeSlot)
        {
            try
            {
                _context.TimeSlots.Update(timeSlot);
                
                await _context.SaveChangesAsync();
                return timeSlot;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new TimeSlot();
            }
        }
    }
}
