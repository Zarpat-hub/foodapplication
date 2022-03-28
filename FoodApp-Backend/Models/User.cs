using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodApp_Backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }

        [NotMapped]
        public Role Role { get; set; }

    }
}
