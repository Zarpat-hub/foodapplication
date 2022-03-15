using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;

namespace FoodApp_Backend.Service
{
    public interface IRestaurantService
    {
        void AddRestaurant(RestaurantDTO restaurantDTO);
    }

    public class RestaurantService : IRestaurantService
    {
        private readonly ApplicationDbContext _context;

        public RestaurantService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void AddRestaurant(RestaurantDTO restaurant)
        {
            var restaurantModel = new Restaurant();
            restaurantModel.Name = restaurant.Name;

            using (var dataStream = new MemoryStream())
            {
                restaurant.File.CopyTo(dataStream);
                restaurantModel.Image = dataStream.ToArray();
            }

            _context.Add(restaurantModel);
            _context.SaveChanges();
        }
    }
}
