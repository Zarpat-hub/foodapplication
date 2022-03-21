using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;

namespace FoodApp_Backend.Service
{
    public interface IRestaurantService
    {
        void AddRestaurant(RestaurantDTO restaurantDTO);
        IEnumerable<Restaurant> GetRestaurants();
    }

    public class RestaurantService : IRestaurantService
    {
        private readonly ApplicationDbContext _context;

        public RestaurantService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Restaurant> GetRestaurants()
        {
            var restaurants = _context.Restaurants;
            foreach (var restaurant in restaurants)
            {
                var dishes = (from d in _context.Dishes
                              join d2r in _context.DishesToRestaurants on d.Id equals d2r.DishId
                              where d2r.RestaurantId == restaurant.Id
                              select d).AsEnumerable();

                restaurant.Menu = dishes;
            }

            return restaurants.ToList();
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
