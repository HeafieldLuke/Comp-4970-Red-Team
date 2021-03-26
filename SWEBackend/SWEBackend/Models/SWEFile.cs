using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SWEBackend.Models
{
    public class SWEFile
    {
        [Key]
        public int Id { get; set; }
        public byte[] ByteData { get; set; }
        public List<Speaker> Speakers { get; set; }
    }
}
