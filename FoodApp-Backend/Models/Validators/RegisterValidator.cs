using FluentValidation;
using FoodApp_Backend.Data;
using FoodApp_Backend.Models.DTOs;

namespace FoodApp_Backend.Models.Validators
{
    public class RegisterValidator : AbstractValidator<RegisterDTO>
    {
        public RegisterValidator(ApplicationDbContext context)
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
            RuleFor(x => x.ConfirmPassword).Equal(u => u.Password);
            RuleFor(x => x.RoleID).NotEmpty().InclusiveBetween(1, 2);
            RuleFor(x => x.Email).Custom((value, _context) =>
            {
                var emailExist = context.Users.Any(u => u.Email == value);
                if (emailExist)
                    _context.AddFailure(nameof(User.Email),"Email is already taken");
            });
        }
    }
}
