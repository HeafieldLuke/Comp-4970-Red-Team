using Microsoft.AspNetCore.Mvc;
using SWEBackend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using SWEBackend.Controllers.TimeSlots;
using System;

namespace SWEBackend.API
{
    [ApiController]
    [Route("api/timeslots")]
    public class TimeSlotsAPI : ControllerBase
    {
        private readonly ITimeSlotsController _timeSlotsController;

        public TimeSlotsAPI(ITimeSlotsController timeSlotsController)
            => _timeSlotsController = timeSlotsController;

        [HttpGet]
        public async Task<List<TimeSlot>> GetTimeSlotsAsync()
            => await _timeSlotsController.GetTimeSlotsAsync();

        [HttpGet("{id}")]
        public async Task<TimeSlot> GetTimeSlotAsync(Guid id)
            => await _timeSlotsController.GetTimeSlotAsync(id);

        [HttpPost]
        public async Task<TimeSlot> PostTimeSlotAsync([FromBody] TimeSlot timeSlot)
            => await _timeSlotsController.CreateTimeSlotAsync(timeSlot);

        [HttpPut]
        public async Task<TimeSlot> PutTimeSlotAsync([FromBody] TimeSlot timeSlot)
            => await _timeSlotsController.UpdateTimeSlotAsync(timeSlot);

        [HttpDelete("{id}")]
        public async Task<int> DeleteTimeSlotAsync(Guid id)
            => await _timeSlotsController.DeleteTimeSlotAsync(id);
    }
}
