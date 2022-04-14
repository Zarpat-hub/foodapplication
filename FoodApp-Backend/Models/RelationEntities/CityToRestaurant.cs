using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models.RelationEntities
{
    public class CityToRestaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CityID { get; set; }
        [Required]
        public int RestaurantID { get; set; }
    }
}
