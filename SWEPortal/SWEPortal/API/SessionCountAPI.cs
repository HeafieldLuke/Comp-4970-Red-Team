using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.SessionCounts;
using System;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/sessioncount")]
    public class SessionCountAPI : ControllerBase
    {
        private readonly ISessionCountsController _roomsController;

        public SessionCountAPI(ISessionCountsController roomsController)
            => _roomsController = roomsController;

        [HttpGet("{id}")]
        public async Task<List<SessionCount>> GetSessionCountsAsync(Guid id)
            => await _roomsController.GetSessionCountsAsync(id);

        [HttpPost]
        public async Task<SessionCount> PostSessionCountAsync([FromBody] SessionCount sessionCount)
            => await _roomsController.CreateSessionCountAsync(sessionCount);

        [HttpPut]
        public async Task<SessionCount> PutSessionCountAsync([FromBody] SessionCount sessionCount)
            => await _roomsController.UpdateSessionCountAsync(sessionCount);

        [HttpDelete("{id}")]
        public async Task<int> DeleteSessionCountAsync(Guid id)
            => await _roomsController.DeleteSessionCountAsync(id);
    }
}
