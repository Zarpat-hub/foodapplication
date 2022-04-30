using System.ComponentModel.DataAnnotations;
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

        public bool hasEmployeeAccount { get; set; } = false;

        public int EmployeeId { get; set; } 

        [NotMapped]
        public IEnumerable<Dish> Menu { get; set; }
        [NotMapped]
        public IEnumerable<City> Cities { get; set; }
    }
}
