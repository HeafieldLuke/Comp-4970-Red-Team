using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SWEBackend.Models
{
    public class SessionCount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public CountType Type { get; set; }
        public int Count { get; set; }
        public Guid SessionId { get; set; }
        [ForeignKey("SessionId")]
        public Session Session { get; set; }
    }
}
