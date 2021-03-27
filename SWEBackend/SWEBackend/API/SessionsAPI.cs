using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.Sessions;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/sessions")]
    public class SessionsAPI : ControllerBase
    {
        private readonly ISessionsController _sessionsController;

        public SessionsAPI(ISessionsController sessionsController)
            => _sessionsController = sessionsController;

        [HttpGet]
        public async Task<List<Session>> GetSessionsAsync(int? venueId)
            => await _sessionsController.GetSessionsAsync(venueId);

        [HttpGet("{id}")]
        public async Task<Session> GetSessionAsync(int id)
            => await _sessionsController.GetSessionAsync(id);

        [HttpPost]
        public async Task<Session> PostSessionAsync([FromBody] Session session)
            => await _sessionsController.CreateSessionAsync(session);

        [HttpPut]
        public async Task<Session> PutSessionAsync([FromBody] Session session)
            => await _sessionsController.UpdateSessionAsync(session);

        [HttpDelete("{id}")]
        public async Task<int> DeleteSessionAsync(int id)
            => await _sessionsController.DeleteSessionAsync(id);
    }
}
