using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodApp_Backend.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int RestaurantID { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int CityID { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string HouseNumber { get; set; } // House number can contain letter ex. "12a" "12b"
        [Required]
        public StatusEnum Status { get; set; }

        [Required]
        public DateTime DataCreated { get; set; }
        public DateTime DataSend { get; set; }
        public DateTime DataAccepted { get; set; }

        [NotMapped]
        public IEnumerable<Tuple<Dish,int>> Dishes { get; set; }
        [NotMapped]
        public string CityName { get; set; }

        public enum StatusEnum
        {
           IN_PROCESS,
           SEND,
           FINISHED
        }
    }
}
