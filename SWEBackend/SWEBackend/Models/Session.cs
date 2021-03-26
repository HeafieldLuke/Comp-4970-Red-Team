using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SWEBackend.Models
{
    public class Session
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int RoomId { get; set; }
        public int TimeSlotId { get; set; }
        public int SpeakerId { get; set; }
        [ForeignKey("RoomId")]
        public Room Room { get; set; }
        [ForeignKey("TimeSlotId")]
        public TimeSlot TimeSlot { get; set; }
        [ForeignKey("SpeakerId")]
        public Speaker Speaker { get; set; }
    }
}
