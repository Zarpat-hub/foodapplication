using FoodApp_Backend;
using FoodApp_Backend.Data;
using FoodApp_Backend.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers(options =>
{
    var jsonInputFormatter = options.InputFormatters
    .OfType<Microsoft.AspNetCore.Mvc.Formatters.SystemTextJsonInputFormatter>()
    .Single();
    jsonInputFormatter.SupportedMediaTypes.Add("multipart/form-data");
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
}

var dbcontext = new ApplicationDbContext();
var seeder = new Seeder(dbcontext);
seeder.SeedRoles();

// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();
