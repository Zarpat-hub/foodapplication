using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public String Name { get; set; }
    }
}
