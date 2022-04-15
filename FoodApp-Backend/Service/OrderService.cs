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
    }
}
