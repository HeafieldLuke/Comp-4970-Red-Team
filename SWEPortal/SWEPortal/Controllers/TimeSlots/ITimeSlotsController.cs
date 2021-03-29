using SWEBackend.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SWEBackend.Controllers.TimeSlots
{
    public interface ITimeSlotsController
    {
        public Task<List<TimeSlot>> GetTimeSlotsAsync();
        public Task<TimeSlot> GetTimeSlotAsync(Guid id);
        public Task<TimeSlot> CreateTimeSlotAsync(TimeSlot timeSlot);
        public Task<TimeSlot> UpdateTimeSlotAsync(TimeSlot timeSlot);
        public Task<int> DeleteTimeSlotAsync(Guid id);
    }
}
