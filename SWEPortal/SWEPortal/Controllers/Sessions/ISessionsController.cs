using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Sessions
{
    public interface ISessionsController
    {
        public Task<List<Session>> GetSessionsAsync(Guid? venueId);
        public Task<Session> GetSessionAsync(Guid id);
        public Task<Session> CreateSessionAsync(Session session);
        public Task<Session> UpdateSessionAsync(Session session);
        public Task<int> DeleteSessionAsync(Guid id);
    }
}
