using FoodApp_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodApp_Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Colour> Colors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var server = Environment.GetEnvironmentVariable("DB_SERVER");
            var port = Environment.GetEnvironmentVariable("DB_PORT");
            var username = Environment.GetEnvironmentVariable("DB_USER");
            var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
            var name = Environment.GetEnvironmentVariable("DB_NAME");

            
            var connectionString = $"Server={server},{port};Initial Catalog={name};User ID={username};Password={password}";

            optionsBuilder.UseSqlServer(connectionString);

        }
    }
}
