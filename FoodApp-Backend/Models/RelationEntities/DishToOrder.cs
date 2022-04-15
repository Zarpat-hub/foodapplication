using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models.RelationEntities
{
    public class DishToOrder
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int OrderID { get; set; }
        [Required]
        public int DishID { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
