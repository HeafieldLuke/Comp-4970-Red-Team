using SWEBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.Speakers
{
    public interface ISpeakersController
    {
        public Task<List<Speaker>> GetSpeakersAsync();
        public Task<Speaker> GetSpeakerAsync(int id);
        public Task<Speaker> CreateSpeakerAsync(Speaker speaker);
        public Task<Speaker> UpdateSpeakerAsync(Speaker speaker);
        public Task<int> DeleteSpeakerAsync(int id);
    }
}
