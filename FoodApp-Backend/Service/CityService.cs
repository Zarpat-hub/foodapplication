using FoodApp_Backend.Data;
using FoodApp_Backend.Models;

namespace FoodApp_Backend.Service
{
    public interface ICityService
    {
        IEnumerable<City> GetCities();
    }

    public class CityService : ICityService
    {
        private readonly ApplicationDbContext _context;

        public CityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<City> GetCities()
        {
            return _context.Cities.AsEnumerable();
        }
    }
}
