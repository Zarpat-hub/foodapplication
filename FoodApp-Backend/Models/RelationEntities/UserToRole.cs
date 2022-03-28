using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models.RelationEntities
{
    public class UserToRole
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int RoleID { get; set; }
    }
}
