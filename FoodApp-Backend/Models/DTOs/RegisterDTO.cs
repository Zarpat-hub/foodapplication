namespace FoodApp_Backend.Models.DTOs
{
    public class RegisterDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public int RoleID { get; set; } //1.User, 2.Owner, rest should be blocked at registration point
    }
}
