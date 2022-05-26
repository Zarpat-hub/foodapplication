using FoodApp_Backend.Models;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Authorization;
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

        [HttpDelete]
        [Authorize("User")]
        public ActionResult DeleteAccount(int userID)
        {
            _userService.DeleteAccount(userID);
            Response.Cookies.Delete("jwt");
            return Ok();
        }

        [HttpPost("{id}/balance")]
        //[Authorize("User")]
        public ActionResult AddBalance(int id, [FromBody]int balance)
        {
            _userService.AddBalance(balance, id);
            return Ok();
        }

        [HttpGet("claims")]
        public ActionResult<IEnumerable<Claim>> GetUserClaims()
        {
            var jwt = Request.Cookies["jwt"];

            if (jwt == null)
                return BadRequest("No user logged in");

            var userClaims = _userService.GetUserClaimsByJWT(jwt);

            return userClaims.ToList();
        }
    }
}
