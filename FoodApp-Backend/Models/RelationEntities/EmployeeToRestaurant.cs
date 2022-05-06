using System.ComponentModel.DataAnnotations;

namespace FoodApp_Backend.Models.RelationEntities
{
    public class EmployeeToRestaurant
    {
        [Key]
        public int Id { get; set; }
        public int RestaurantID { get; set; }
        public int CityID { get; set; }
        public int EmployeeID { get; set; }
    }
}
