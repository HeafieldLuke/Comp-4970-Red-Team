using SWEBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Rooms
{
    public interface IRoomsController 
    {
        public Task<List<Room>> GetRoomsAsync(int? venueId);
        public Task<Room> GetRoomAsync(int id);
        public Task<Room> CreateRoomAsync(Room room);
        public Task<Room> UpdateRoomAsync(Room room);
        public Task<int> DeleteRoomAsync(int id);
    }
}
