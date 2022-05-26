using FoodApp_Backend.Data;
using FoodApp_Backend.Models;
using FoodApp_Backend.Models.DTOs;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        //[Authorize(Roles ="User")]
        public ActionResult MakeOrder(OrderDTO[] orderDTOs,int userID)
        {
            //var jwt = Request.Cookies["jwt"];
            _orderService.MakeOrder(orderDTOs, userID);
            return Ok();
        }
        [HttpPost("delivered")]
        [Authorize(Roles = "User")]
        public ActionResult MarkAsDelivered(int orderID)
        {
            _orderService.MarkAsDelivered(orderID);

            return Ok();
        }

        [HttpGet("user/all")]
        public ActionResult<IEnumerable<Order>> GetUserOrders(int userID)
        {
            var orders = _orderService.GetAllUserOrders(userID);
            return Ok(orders);
        }

        [HttpGet("user/active")]
        public ActionResult<IEnumerable<Order>> GetActiveUserOrders(int userID)
        {
            var orders = _orderService.GetActiveUserOrders(userID);
            return Ok(orders);
        }
        
        [HttpGet("user/finished")]
        public ActionResult<IEnumerable<Order>> GetFinishedUserOrders(int userID)
        {
            var orders = _orderService.GetFinishedUserOrders(userID);
            return Ok(orders);
        }
    }
}
