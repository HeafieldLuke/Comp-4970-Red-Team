using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.Rooms;

namespace SWEBackend.API.Rooms
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomsAPI : ControllerBase
    {
        private readonly IRoomsController _roomController;

        public RoomsAPI(IRoomsController roomsController)
            => _roomController = roomsController;

        [HttpGet]
        public async Task<List<Room>> Get(int? id)
            => await _roomController.GetRoomsAsync(id);
    }
}
