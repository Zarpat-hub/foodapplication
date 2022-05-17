using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodApp_Backend.Migrations
{
    public partial class Ratings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Restaurants",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "ReviewsNumber",
                table: "Restaurants",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "ReviewsNumber",
                table: "Restaurants");
        }
    }
}
