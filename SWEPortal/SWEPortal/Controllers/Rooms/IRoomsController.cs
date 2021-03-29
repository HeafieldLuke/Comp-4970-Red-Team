using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Rooms
{
    public interface IRoomsController 
    {
        public Task<List<Room>> GetRoomsAsync(Guid? venueId);
        public Task<Room> GetRoomAsync(Guid id);
        public Task<Room> CreateRoomAsync(Room room);
        public Task<Room> UpdateRoomAsync(Room room);
        public Task<int> DeleteRoomAsync(Guid id);
    }
}
