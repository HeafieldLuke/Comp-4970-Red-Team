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
            _context.Rooms.Add(new Room { Name = "First Room", Capacity = 10 });

            _context.SaveChanges();
        }
    }
}
