using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.Rooms;
using System;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsAPI : ControllerBase
    {
        private readonly IRoomsController _roomsController;

        public RoomsAPI(IRoomsController roomsController)
            => _roomsController = roomsController;

        [HttpGet]
        public async Task<List<Room>> GetRoomsAsync(Guid? venueId)
            => await _roomsController.GetRoomsAsync(venueId);

        [HttpGet("{id}")]
        public async Task<Room> GetRoomAsync(Guid id)
            => await _roomsController.GetRoomAsync(id);

        [HttpPost]
        public async Task<Room> PostRoomAsync([FromBody] Room room)
            => await _roomsController.CreateRoomAsync(room);

        [HttpPut]
        public async Task<Room> PutRoomAsync([FromBody] Room room)
            => await _roomsController.UpdateRoomAsync(room);

        [HttpDelete("{id}")]
        public async Task<int> DeleteRoomAsync(Guid id)
            => await _roomsController.DeleteRoomAsync(id);
    }
}
