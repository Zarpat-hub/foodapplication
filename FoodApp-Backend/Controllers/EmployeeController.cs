using FoodApp_Backend.Models;
using FoodApp_Backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FoodApp_Backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("orders")]
        [Authorize(Roles = "Worker")]
        public ActionResult<IEnumerable<Order>> Orders(int employeeID)
        {
            var orders = _employeeService.Orders(employeeID);

            return Ok(orders);
        }

        [HttpPost]
        [Authorize(Roles = "Worker")]
        public ActionResult ChangeStatus(int orderID)
        {
            _employeeService.ChangeStatus(orderID);

            return Ok();
        }
    }
}
