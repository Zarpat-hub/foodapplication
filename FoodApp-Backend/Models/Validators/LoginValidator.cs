using FluentValidation;
using FoodApp_Backend.Models.DTOs;

namespace FoodApp_Backend.Models.Validators
{
    public class LoginValidator : AbstractValidator<LoginDTO>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
