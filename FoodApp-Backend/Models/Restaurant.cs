﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodApp_Backend.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public byte[] Image { get; set; }
 
        public int OwnerId { get; set; }

        public double Rating { get; set; } = 0;
        public double AverageRating { get; set; } = 0;
        public int ReviewsNumber { get; set; } = 0;

        [NotMapped]
        public IEnumerable<Dish> Menu { get; set; }
        [NotMapped]
        public IEnumerable<City> Cities { get; set; }
        [NotMapped]
        public Dictionary<string, bool> HasEmployeeAccount { get; set; }
    }
}
