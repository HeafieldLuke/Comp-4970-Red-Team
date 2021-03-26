using Microsoft.AspNetCore.Mvc;
using SWEBackend.Data;
using System.Linq;
using SWEBackend.Models;

namespace SWEBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FillController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FillController(ApplicationDbContext context)
            => _context = context;

        [HttpGet]
        public void Get()
        {
            _context.Venues.Add(new Venue("Cool Venue"));
            _context.SaveChanges();

            var venue = _context.Venues.FirstOrDefault();

            _context.Rooms.Add(new Room { Name = "Rons Room", Capacity = -1, VenueId = venue.Id });

            _context.SaveChanges();
        }
    }
}
