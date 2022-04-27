using System.Text.Json.Serialization;

namespace FoodApp_Backend.Models.DTOs
{
    public class RestaurantDTO
    {
        public string Name { get; set; }
        public IFormFile File { get; set; }
        public int[] CitiesIDs { get; set; }
    }
}
