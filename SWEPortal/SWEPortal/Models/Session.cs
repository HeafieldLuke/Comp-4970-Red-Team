using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SWEBackend.Models
{
    public class Session
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid RoomId { get; set; }
        public Guid TimeSlotId { get; set; }
        public Guid SpeakerId { get; set; }
        [ForeignKey("RoomId")]
        public Room Room { get; set; }
        [ForeignKey("TimeSlotId")]
        public TimeSlot TimeSlot { get; set; }
        [ForeignKey("SpeakerId")]
        public Speaker Speaker { get; set; }
        public List<SessionCount> SessionCounts { get; set; }
    }
}
