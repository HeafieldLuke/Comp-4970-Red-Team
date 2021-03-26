using SWEBackend.Data;
using SWEBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace SWEBackend.Controllers.Rooms
{
    public class RoomsController : IRoomsController
    {
        private readonly ILogger<IRoomsController> _logger;
        private readonly ApplicationDbContext _context;

        public RoomsController(ILogger<IRoomsController> logger, ApplicationDbContext context)
            => (_logger, _context) = (logger, context);

        public async Task<Room> CreateRoomAsync(Room room)
        {
            try
            {
                await _context.Rooms.AddAsync(room);
                
                await _context.SaveChangesAsync();
                return room;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Room();
            }
        }

        public async Task<int> DeleteRoomAsync(int id)
        {
            var room = await _context.Rooms.FirstOrDefaultAsync(f => f.Id == id);

            if (room != null)
            {
                try
                {
                    _context.Rooms.Remove(room);
                    
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

        public async Task<List<Room>> GetRoomsAsync(int? id)
        {
            if (id.HasValue)
                return await _context.Rooms.Where(f => f.VenueId == id).ToListAsync();
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> GetRoomAsync(int id)
            => await _context.Rooms.FirstOrDefaultAsync(f => f.Id == id);

        public async Task<Room> UpdateRoomAsync(Room room)
        {
            try
            {
                _context.Rooms.Update(room);
                
                await _context.SaveChangesAsync();
                return room;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, ex.ToString());
                return new Room();
            }
        }
    }
}
