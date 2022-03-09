using FoodApp_Backend.Data;
using FoodApp_Backend.Models;

namespace FoodApp_Backend
{
    public class TestSeeder
    {
        private readonly ApplicationDbContext _context;

        public TestSeeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public void SeedColors()
        {
            if (_context.Database.CanConnect())
            {
                if (!_context.Colors.Any())
                {
                    var colors = GetColors();
                    _context.Colors.AddRange(colors);
                    _context.SaveChanges();
                }
            }
        }

        private IEnumerable<Colour> GetColors()
        {
            var colors = new List<Colour>()
            {
                new Colour() {Name ="Red"},
                new Colour() {Name ="Yellow"},
                new Colour() {Name ="Green"}
            };

            return colors;
        }
    }
}
