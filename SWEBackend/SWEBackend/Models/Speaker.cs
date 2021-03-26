using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SWEBackend.Models
{
    public class Speaker
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public int SpeakerPhotoId { get; set; }
        [ForeignKey("SpeakerPhotoId")]
        public SWEFile SpeakerPhoto { get; set; }
        public List<Session> Sessions { get; set; }
    }
}
