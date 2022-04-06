using FoodApp_Backend.Models;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("claims")]
        public ActionResult<IEnumerable<Claim>> GetUserClaims()
        {
            var jwt = Request.Cookies["jwt"];

            var userClaims = _userService.GetUserClaimsByJWT(jwt);

            return userClaims.ToList();
        }
    }
}
