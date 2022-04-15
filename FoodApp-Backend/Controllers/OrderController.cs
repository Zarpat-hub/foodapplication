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
        [Authorize(Roles ="User")]
        public ActionResult MakeOrder(OrderDTO[] orderDTOs)
        {
            var jwt = Request.Cookies["jwt"];
            _orderService.MakeOrder(orderDTOs, jwt);
            return Ok();
        }
    }
}
