using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models.RelationEntities
{
    public class DishToRestaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RestaurantId { get; set; }
        [Required]
        public int DishId { get; set; }
    }
}
