using FoodApp_Backend.Data;
using FoodApp_Backend.Models;

namespace FoodApp_Backend.Repositories
{
    public interface IDishRepository
    {
        void GetDishesForAllOrders(Order[] orders);
        void GetCityNameForAllOrders(Order[] orders);
        void GetRestaurantNameForAllOrders(Order[] orders);
    }

    public class DishRepository : IDishRepository
    {
        private readonly ApplicationDbContext _context;

        public DishRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void GetDishesForAllOrders(Order[] orders)
        {
            foreach (var order in orders)
            {
                var dishes = (from d in _context.Dishes
                              join d2o in _context.DishesToOrders on d.Id equals d2o.DishID
                              where order.Id == d2o.OrderID
                              select new Tuple<Dish, int>(d, d2o.Quantity)).AsEnumerable();


                order.Dishes = dishes;
            }
        }

        public void GetCityNameForAllOrders(Order[] orders)
        {
            foreach (var order in orders)
            {
                var city = _context.Cities.FirstOrDefault(c => c.Id == order.CityID);

                order.CityName = city.Name;
            }
        }

        public void GetRestaurantNameForAllOrders(Order[] orders)
        {
            foreach (var order in orders)
            {
                var restaurant = _context.Restaurants.FirstOrDefault(r => r.Id == order.RestaurantID);

                order.RestaurantName = restaurant.Name;
            }
        }
    }
}
