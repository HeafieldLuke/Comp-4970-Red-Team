using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using SWEBackend.Controllers.Rooms;

namespace SWEBackend.API.Rooms
{
    [ApiController]
    [Route("api/room")]
    public class RoomAPI : ControllerBase
    {
        private readonly IRoomsController _roomController;

        public RoomAPI(IRoomsController roomController)
            => _roomController = roomController;

        [HttpGet]
        public async Task<Room> Get(int id)
            => await _roomController.GetRoomAsync(id);

        [HttpPost]
        public async Task<Room> Post(Room room)
            => await _roomController.CreateRoomAsync(room);

        [HttpPut]
        public async Task<Room> Put(Room room)
            => await _roomController.UpdateRoomAsync(room);

        [HttpDelete]
        public async Task<int> Delete(int id)
            => await _roomController.DeleteRoomAsync(id);
    }
}
