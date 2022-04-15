namespace FoodApp_Backend.Models.DTOs
{
    public class OrderDTO
    {
        public int RestaurantID { get; set; }
        public int CityID { get; set; }
        public int DishID { get; set; }
        public int Quantity { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
    }
}
