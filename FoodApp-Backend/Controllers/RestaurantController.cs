using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        private readonly ApplicationDbContext _context;

        public RestaurantController(IRestaurantService restaurantService, ApplicationDbContext context)
        {
            _restaurantService = restaurantService;
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurants()
        {
            var restaurants = _restaurantService.GetRestaurants();

            return restaurants.ToList();
        }

        [HttpPost]
        public ActionResult AddRestaurant([FromForm]RestaurantDTO restaurant)
        {
            _restaurantService.AddRestaurant(restaurant);

            return Ok();
        }
    }
}
