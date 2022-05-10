using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.RelationEntities;
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

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Order> Orders(int employeeID)
        {
            var employeeRestaurant = _context.EmployeeToRestaurants.FirstOrDefault(e => e.EmployeeID == employeeID);

            var cityID = employeeRestaurant.CityID;
            var restaurantID = employeeRestaurant?.RestaurantID;

            var orders = _context.Orders.Where(o => o.RestaurantID == restaurantID && o.CityID == cityID).AsEnumerable();

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
