using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ColourController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ColourController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("colors")]
        public ActionResult<IEnumerable<Colour>> GetColors()
        {
            return _context.Colors;
        }
    }
}
