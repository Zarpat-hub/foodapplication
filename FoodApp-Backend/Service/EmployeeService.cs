using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.RelationEntities;
using FoodApp_Backend.Repositories;
using System.Security.Claims;

namespace FoodApp_Backend.Service
{
    public interface IEmployeeService
    {
        IEnumerable<Order> Orders(int employeeID);
        void ChangeStatus(int orderID);
    }

    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IDishRepository _dishRepository;

        public EmployeeService(ApplicationDbContext context, IDishRepository dishRepository)
        {
            _context = context;
            _dishRepository = dishRepository;
        }

        public IEnumerable<Order> Orders(int employeeID)
        {
            var employeeRestaurant = _context.EmployeeToRestaurants.FirstOrDefault(e => e.EmployeeID == employeeID);

            var cityID = employeeRestaurant.CityID;
            var restaurantID = employeeRestaurant?.RestaurantID;

            var orders = _context.Orders.Where(o => o.RestaurantID == restaurantID && o.CityID == cityID).AsEnumerable();
            _dishRepository.GetDishesForAllOrders(orders.ToArray());
            _dishRepository.GetRestaurantNameForAllOrders(orders.ToArray());
            _dishRepository.GetCityNameForAllOrders(orders.ToArray());

            return orders;
        }

        public void ChangeStatus(int orderID)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == orderID);
            order.Status = Order.StatusEnum.SEND;
            _context.SaveChanges();
        }
    }
}
