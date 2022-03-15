﻿using FoodApp_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodApp_Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Colour> Colors { get; set; }
        public DbSet<Restaurant> Restaurants { get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var server = Environment.GetEnvironmentVariable("DB_SERVER");
            var username = Environment.GetEnvironmentVariable("DB_USER");
            var password = Environment.GetEnvironmentVariable("DB_PASSWORD");
            var name = Environment.GetEnvironmentVariable("DB_NAME");

            
            var connectionString = $"Server={server};Initial Catalog={name};User ID={username};Password={password}";

            optionsBuilder.UseSqlServer(connectionString);

        }
    }
}
