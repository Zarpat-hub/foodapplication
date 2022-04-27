using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FoodApp_Backend.Service
{
    public interface IUserService
    {
        IEnumerable<Claim> GetUserClaimsByJWT(string jwt);
        User GetCurrentUser(string jwt);
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Claim> GetUserClaimsByJWT(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);

            var claims = token.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier || c.Type == ClaimTypes.Name
                                            || c.Type == ClaimTypes.Email || c.Type == ClaimTypes.Role 
                                            || c.Type == ClaimTypes.Sid).ToList();
            claims.Add(new Claim(ClaimTypes.UserData, jwt));

            return claims;
        }

        public User GetCurrentUser(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);

            var user = _context.Users.FirstOrDefault(u => u.Id == Int32.Parse(token.Claims.FirstOrDefault(c => c.Type ==                                                                        ClaimTypes.NameIdentifier).Value));

            return user;
        }
    }
}
