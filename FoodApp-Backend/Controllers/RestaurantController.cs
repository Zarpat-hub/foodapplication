using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _context;

        public RestaurantController(IRestaurantService restaurantService, ApplicationDbContext context, IUserService userService)
        {
            _restaurantService = restaurantService;
            _context = context;
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurants()
        {
            var restaurants = _restaurantService.GetRestaurants();

            return restaurants.ToList();
        }

        [HttpGet("byCity/{name}")]
        public ActionResult<IEnumerable<Restaurant>> GetRestaurantsByCity(String name)
        {
            var restaurants = _restaurantService.GetRestaurantsByCityName(name);

            return restaurants.ToList();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Restaurant> GetRestaurant(int id)
        {
            var restaurant = _restaurantService.GetRestaurantById(id);

            return restaurant;
        }
        [HttpPost]
        [Authorize(Roles ="Owner")]
        public ActionResult AddRestaurant([FromForm]RestaurantDTO restaurant)
        {
            var jwt = Request.Cookies["jwt"];

            _restaurantService.AddRestaurant(restaurant,jwt);

            return Ok();
        }
    }
}
