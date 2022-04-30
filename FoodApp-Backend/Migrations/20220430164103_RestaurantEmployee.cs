using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodApp_Backend.Migrations
{
    public partial class RestaurantEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Restaurants",
                type: "int",
                nullable: true,
                defaultValue: null);

            migrationBuilder.AddColumn<bool>(
                name: "hasEmployeeAccount",
                table: "Restaurants",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "hasEmployeeAccount",
                table: "Restaurants");
        }
    }
}
