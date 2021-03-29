using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.Speakers;
using System;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/speakers")]
    public class SpeakersAPI : ControllerBase
    {
        private readonly ISpeakersController _speakersController;

        public SpeakersAPI(ISpeakersController speakersController)
            => _speakersController = speakersController;

        [HttpGet]
        public async Task<List<Speaker>> GetSpeakersAsync()
            => await _speakersController.GetSpeakersAsync();

        [HttpGet("{id}")]
        public async Task<Speaker> GetSpeakerAsync(Guid id)
            => await _speakersController.GetSpeakerAsync(id);

        [HttpPost]
        public async Task<Speaker> PostSpeakerAsync([FromBody] Speaker speaker)
            => await _speakersController.CreateSpeakerAsync(speaker);

        [HttpPut]
        public async Task<Speaker> PutSpeakerAsync([FromBody] Speaker speaker)
            => await _speakersController.UpdateSpeakerAsync(speaker);

        [HttpDelete("{id}")]
        public async Task<int> DeleteSpeakerAsync(Guid id)
            => await _speakersController.DeleteSpeakerAsync(id);
    }
}
