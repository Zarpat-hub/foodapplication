using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Models.RelationEntities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FoodApp_Backend.Service
{
    public interface IOrderService
    {
        void MakeOrder(OrderDTO[] orderDTO,string jwt);
        IEnumerable<Order> GetAllUserOrders(int userID);
        IEnumerable<Order> GetActiveUserOrders(int userID);
        IEnumerable<Order> GetFinishedUserOrders(int userID);
    }

    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;

        public OrderService(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public void MakeOrder([FromBody]OrderDTO[] orderDTO,string jwt)
        {
            Order order = new Order();
            order.RestaurantID = orderDTO[0].RestaurantID;

            var userId = _userService.GetUserClaimsByJWT(jwt).FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            order.UserID = Convert.ToInt32(userId);

            Console.WriteLine(userId);

            order.CityID = orderDTO[0].CityID;
            order.Street = orderDTO[0].Street;
            order.HouseNumber = orderDTO[0].HouseNumber;
            order.Status = Order.StatusEnum.IN_PROCESS;
            order.DataCreated = DateTime.Now;
            _context.Add(order);
            _context.SaveChanges();

            foreach ( var dto in orderDTO )
            { 
                DishToOrder dishToOrder = new DishToOrder();
                dishToOrder.OrderID = order.Id;
                dishToOrder.DishID = dto.DishID;
                dishToOrder.Quantity = dto.Quantity;
                _context.Add(dishToOrder);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Order> GetAllUserOrders(int userID)
        {
            var orders = _context.Orders.Where( o => o.UserID == userID).AsEnumerable();
            GetDishesForAllOrders(orders.ToArray());
            GetCityNameForAllOrders(orders.ToArray());
            GetRestaurantNameForAllOrders(orders.ToArray());

            return orders;
        }

        public IEnumerable<Order> GetActiveUserOrders(int userID)
        {
            var orders = _context.Orders.Where(o => o.UserID == userID && (o.Status == Order.StatusEnum.IN_PROCESS
                                                                           || o.Status == Order.StatusEnum.SEND));
            GetDishesForAllOrders(orders.ToArray());
            GetCityNameForAllOrders(orders.ToArray());
            GetRestaurantNameForAllOrders(orders.ToArray());

            return orders;
        }

        public IEnumerable<Order> GetFinishedUserOrders(int userID)
        {
            var orders = _context.Orders.Where(o => o.UserID == userID && o.Status == Order.StatusEnum.FINISHED);
            GetDishesForAllOrders(orders.ToArray());
            GetCityNameForAllOrders(orders.ToArray());
            GetRestaurantNameForAllOrders(orders.ToArray());

            return orders;                                                               
        }

        private void GetDishesForAllOrders(Order[] orders)
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

        private void GetCityNameForAllOrders(Order[] orders)
        {
            foreach (var order in orders)
            {
                var city = _context.Cities.FirstOrDefault(c => c.Id == order.CityID);

                order.CityName = city.Name;
            }
        }

        private void GetRestaurantNameForAllOrders(Order[] orders)
        {
            foreach(var order in orders)
            {
                var restaurant = _context.Restaurants.FirstOrDefault(r => r.Id == order.RestaurantID);

                order.RestaurantName = restaurant.Name;
            }
        }
    }
}
