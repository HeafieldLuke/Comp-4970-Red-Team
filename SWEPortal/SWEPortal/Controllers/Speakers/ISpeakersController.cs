using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Speakers
{
    public interface ISpeakersController
    {
        public Task<List<Speaker>> GetSpeakersAsync();
        public Task<Speaker> GetSpeakerAsync(Guid id);
        public Task<Speaker> CreateSpeakerAsync(Speaker speaker);
        public Task<Speaker> UpdateSpeakerAsync(Speaker speaker);
        public Task<int> DeleteSpeakerAsync(Guid id);
    }
}
