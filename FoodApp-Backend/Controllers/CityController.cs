using FoodApp_Backend.Models;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CityController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<City>> GetCities()
        {
            return _cityService.GetCities().ToList();
        }
    }
}
