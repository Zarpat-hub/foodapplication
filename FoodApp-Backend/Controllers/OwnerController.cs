using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OwnerController : ControllerBase
    {
        private readonly IOwnerService _ownerService;
        private readonly IUserService _userService;
        private readonly IAccountService _accountService;

        public OwnerController(IOwnerService ownerService, IUserService userService, IAccountService accountService)
        {
            _ownerService = ownerService;
            _userService = userService;
            _accountService = accountService;
        }

        [HttpGet("owned")]
        [Authorize(Roles ="Owner")]
        public ActionResult<IEnumerable<Restaurant>> GetOwnedRestaurants()
        {
            var jwt = Request.Cookies["jwt"];
            var currentUser = _userService.GetCurrentUser(jwt);

            var ownedRestaurants = _ownerService.GetOwnedRestaurants(currentUser.Id);
            return ownedRestaurants.ToList();
        }
        [HttpPost("{restaurantId}/menuItem")]
        [Authorize(Roles ="Owner")]
        public ActionResult AddItemToMenu([FromBody]Dish dish,int restaurantId)
        {
            _ownerService.AddItemToMenu(dish, restaurantId);
            return Ok();
        }
        [HttpPost("{restaurantId}/employee")]
        [Authorize(Roles ="Owner")]
        public ActionResult AddEmployeeAccount([FromBody]EmployeeDTO employeeDTO,int restaurantId)
        {
            _accountService.AddEmployee(employeeDTO,restaurantId);
            return Ok();
        }
    }
}
