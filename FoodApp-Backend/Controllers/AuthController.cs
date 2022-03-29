using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AuthController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("user")]
        public ActionResult RegisterUser([FromBody]RegisterDTO registerDTO)
        {
            _accountService.RegisterUser(registerDTO);
            return Ok();
        }

        [HttpPost("token")]
        public ActionResult Login([FromBody]LoginDTO loginDTO)
        {
            string token = _accountService.GenerateJWT(loginDTO);
            return Ok(new { token });
        }
    }
}
