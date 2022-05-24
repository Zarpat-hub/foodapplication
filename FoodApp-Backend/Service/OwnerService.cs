using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Models.RelationEntities;
using FoodApp_Backend.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace FoodApp_Backend.Service
{
    public interface IOwnerService
    {
        IEnumerable<Restaurant> GetOwnedRestaurants(int ownerID);
        void AddItemToMenu(Dish dishModel, int restaurantID);
        void DeleteItemFromMenu(int dishID);
    }

    public class OwnerService : IOwnerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IDishRepository _dishRepository;

        public OwnerService(ApplicationDbContext context, IDishRepository dishRepository)
        {
            _context = context;
            _dishRepository = dishRepository;
        }

        public IEnumerable<Restaurant> GetOwnedRestaurants(int ownerID)
        {
            var ownedRestaurants = _context.Restaurants.Where(r => r.OwnerId == ownerID).AsEnumerable();

            return ownedRestaurants;
        }

        public void AddItemToMenu(Dish dishModel, int restaurantID)
        {
            var restaurant = _context.Restaurants.FirstOrDefault(r => r.Id == restaurantID);

            var dish = new Dish();
            dish.Name = dishModel.Name;
            dish.Price = dishModel.Price;
            _context.Add(dish);
            _context.SaveChanges();

            var dishRestaurant = new DishToRestaurant();
            dishRestaurant.RestaurantId = restaurantID;
            dishRestaurant.DishId = dish.Id;
            _context.Add(dishRestaurant);
            _context.SaveChanges();
        }

        public void DeleteItemFromMenu(int dishID)
        {
            var dish = _context.Dishes.FirstOrDefault(d => d.Id == dishID);
            var dishRestaurant = _context.DishesToRestaurants.FirstOrDefault(d => d.DishId == dishID);

            _context.Dishes.Remove(dish);
            _context.DishesToRestaurants.Remove(dishRestaurant);

            _context.SaveChanges();
        }
    }
}
