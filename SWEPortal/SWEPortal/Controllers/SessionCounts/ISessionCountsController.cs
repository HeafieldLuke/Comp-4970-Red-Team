using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.SessionCounts
{
    public interface ISessionCountsController
    {
        public Task<List<SessionCount>> GetSessionCountsAsync(Guid id);
        public Task<SessionCount> CreateSessionCountAsync(SessionCount timeSlot);
        public Task<SessionCount> UpdateSessionCountAsync(SessionCount timeSlot);
        public Task<int> DeleteSessionCountAsync(Guid id);
    }
}
