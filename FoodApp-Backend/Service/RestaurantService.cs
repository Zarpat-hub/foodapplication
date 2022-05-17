using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Models.RelationEntities;

namespace FoodApp_Backend.Service
{
    public interface IRestaurantService
    {
        void AddRestaurant(RestaurantDTO restaurantDTO,string jwt);
        IEnumerable<Restaurant> GetRestaurants();
        Restaurant GetRestaurantById(int id);
        IEnumerable<Restaurant> GetRestaurantsByCityName(String cityName);
        void RateRestaurant(int restaurantID, double rate);
    }

    public class RestaurantService : IRestaurantService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;

        public RestaurantService(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public IEnumerable<Dish> GetDishesForRestaurant(int id)
        {
            var dishes = (from d in _context.Dishes
                          join d2r in _context.DishesToRestaurants on d.Id equals d2r.DishId
                          where d2r.RestaurantId == id
                          select d).AsEnumerable();

            return dishes;
        }

        private IEnumerable<City> GetCitiesForRestaurant(int id)
        {
            var cities = (from c in _context.Cities
                         join c2r in _context.CityToRestaurant on c.Id equals c2r.CityID
                         where c2r.RestaurantID == id
                         select c).AsEnumerable();

            return cities;
        }

        public IEnumerable<Restaurant> GetRestaurants()
        {
            var restaurants = _context.Restaurants;
            foreach (var restaurant in restaurants)
            {
                restaurant.Menu = GetDishesForRestaurant(restaurant.Id);
                restaurant.Cities = GetCitiesForRestaurant(restaurant.Id);
            }
            return restaurants.ToList();
        }

        public Restaurant GetRestaurantById(int id)
        {
            var restaurant = _context.Restaurants.First(x => x.Id == id);
            restaurant.Menu = GetDishesForRestaurant(id);
            var cities = GetCitiesForRestaurant(id);
            restaurant.Cities = cities;

            var dictionary = new Dictionary<string, bool>();

            foreach (var city in cities)
            {
                var employee = _context.EmployeeToRestaurants.FirstOrDefault(e => e.RestaurantID == id && e.CityID == city.Id);
                dictionary.Add(city.Name, employee == null ? false : true);
            }

            restaurant.HasEmployeeAccount = dictionary;

            return restaurant;
        }

        public IEnumerable<Restaurant> GetRestaurantsByCityName(String cityName)
        {
            var city = _context.Cities.FirstOrDefault(c => c.Name.ToLower() == cityName.ToLower());
            var restaurants = (from r in _context.Restaurants
                               join r2c in _context.CityToRestaurant on r.Id equals r2c.RestaurantID
                               where r2c.CityID == city.Id
                               select r).AsEnumerable();

            return restaurants;
        }

        public void AddRestaurant(RestaurantDTO restaurant, string jwt)
        {
            var restaurantModel = new Restaurant();
            restaurantModel.Name = restaurant.Name;
            restaurantModel.OwnerId = _userService.GetCurrentUser(jwt).Id;
            using (var dataStream = new MemoryStream())
            {
                restaurant.File.CopyTo(dataStream);
                restaurantModel.Image = dataStream.ToArray();
            }

            _context.Add(restaurantModel);
            _context.SaveChanges();

            foreach (var id in restaurant.CitiesIDs)
            {
                var restaurantCity = new CityToRestaurant();
                restaurantCity.RestaurantID = restaurantModel.Id;
                restaurantCity.CityID = id;
                _context.Add(restaurantCity);
                _context.SaveChanges();
            }
        }

        public void RateRestaurant(int restaurantID,double rate)
        {
            var restaurant = _context.Restaurants.FirstOrDefault(r => r.Id == restaurantID);
            restaurant.Rating += rate;
            restaurant.ReviewsNumber++;
            _context.SaveChanges();

            restaurant.AverageRating = restaurant.Rating / restaurant.ReviewsNumber;
            _context.SaveChanges();
        }
    }
}
