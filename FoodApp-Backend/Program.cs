using FoodApp_Backend;
using FoodApp_Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ApplicationDbContext>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
}


// Configure the HTTP request pipeline.

var dbcontext = new ApplicationDbContext();
var seeder = new TestSeeder(dbcontext);
seeder.SeedColors();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000"));

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();
