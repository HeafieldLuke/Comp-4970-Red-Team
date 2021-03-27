using SWEBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Sessions
{
    public interface ISessionsController
    {
        public Task<List<Session>> GetSessionsAsync(int? venueId);
        public Task<Session> GetSessionAsync(int id);
        public Task<Session> CreateSessionAsync(Session session);
        public Task<Session> UpdateSessionAsync(Session session);
        public Task<int> DeleteSessionAsync(int id);
    }
}
