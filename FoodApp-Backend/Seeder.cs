using FoodApp_Backend.Data;
using FoodApp_Backend.Models;

namespace FoodApp_Backend
{
    public class Seeder
    {
        private readonly ApplicationDbContext _context;

        public Seeder(ApplicationDbContext context)
        {
            _context = context;
        }

        public void SeedRoles()
        {
            if (_context.Database.CanConnect())
            {
                if (!_context.Roles.Any())
                {
                    var roles = GetRoles();
                    _context.Roles.AddRange(roles);
                    _context.SaveChanges();
                }
            }
        }

        private IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"
                },
                new Role()
                {
                    Name = "Owner"
                },
                new Role()
                {
                    Name = "Worker"
                },
                new Role()
                {
                    Name = "Admin"
                }
            };

            return roles;
        }
    }
}