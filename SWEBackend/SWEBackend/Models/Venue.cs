using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SWEBackend.Models
{
    public class Venue
    {
        public Venue(string name)
            => Name = name;

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Room> Rooms { get; set; }
    }
}
