﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SWEBackend.Models
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public Guid? VenueId { get; set; }
        [ForeignKey("VenueId")]
        public Venue? Venue { get; set; }
    }
}
