using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Models.RelationEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FoodApp_Backend.Service
{
    public interface IAccountService
    {
        void RegisterUser(RegisterDTO registerDTO,int roleID);
        void AddEmployee(EmployeeDTO employeeDTO,int restaurantId);
        string GenerateJWT(LoginDTO loginDTO);
    }

    public class AccountService : IAccountService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AccountService(ApplicationDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public void RegisterUser(RegisterDTO registerDto, int roleID)
        {
            var user = new User();
            user.Name = registerDto.Name;
            user.Email = registerDto.Email;
            user.PasswordHash = _passwordHasher.HashPassword(user,registerDto.Password);
            _context.Users.Add(user);

            _context.SaveChanges();

            var userToRole = new UserToRole();
            userToRole.RoleID = roleID; //1 - user by default, 2 - owner, 3 - employee
            userToRole.UserID = user.Id;
            _context.UsersToRoles.Add(userToRole);

            _context.SaveChanges(); 
        }
        public void AddEmployee(EmployeeDTO employeeDTO,int restaurantId)
        {
            var restaurant = _context.Restaurants.FirstOrDefault(r => r.Id == restaurantId);
            var city = _context.Cities.FirstOrDefault(c => c.Id == employeeDTO.CityID);

            var user = new User();
            user.Name = $"{restaurant.Name} {city.Name}";
            user.Email = $"{restaurant.Name}{city.Name}@restaurant.com";
            user.PasswordHash = _passwordHasher.HashPassword(user, employeeDTO.Password);
            _context.Users.Add(user);

            _context.SaveChanges();

            var userToRole = new UserToRole();
            userToRole.RoleID = 3; // 3 - employee
            userToRole.UserID = user.Id;
            _context.UsersToRoles.Add(userToRole);

            _context.SaveChanges();

            var employeeToRestaurant = new EmployeeToRestaurant();
            employeeToRestaurant.RestaurantID = restaurantId;
            employeeToRestaurant.CityID = employeeDTO.CityID;
            employeeToRestaurant.EmployeeID = user.Id;
            _context.EmployeeToRestaurants.Add(employeeToRestaurant);

            _context.SaveChanges();
        }

        public string GenerateJWT(LoginDTO loginDto)
        {
            var user = CheckLogin(loginDto);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Email, $"{user.Email}"),
                new Claim(ClaimTypes.Role, $"{user.Role.Name}"),
                new Claim(ClaimTypes.Hash, $"{user.AccountBalance}")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var days = Convert.ToInt32(Environment.GetEnvironmentVariable("JWT_EXPIRE_DAYS"));
            var expires = DateTime.Now.AddDays(days);

            var token = new JwtSecurityToken(Environment.GetEnvironmentVariable("JWT_ISSUER"),
                Environment.GetEnvironmentVariable("JWT_ISSUER"),
                claims,
                expires: expires,
                signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.WriteToken(token);
        }
        
        private User CheckLogin(LoginDTO loginDto)
        {
            var user = _context.Users.FirstOrDefault( u => u.Email == loginDto.Email);
           

            if (user == null)
                throw new BadHttpRequestException("Invalid email or password"); //For security of data

            var role = (from r in _context.Roles
                        join utr in _context.UsersToRoles on user.Id equals utr.UserID
                        where utr.RoleID == r.Id
                        select r).FirstOrDefault();
            user.Role = role;

            var result = _passwordHasher.VerifyHashedPassword(user,user.PasswordHash,loginDto.Password);
            if (result == PasswordVerificationResult.Failed)
                throw new BadHttpRequestException("Invalid email or password"); //For security of data

            return user;
        }
    }
}
