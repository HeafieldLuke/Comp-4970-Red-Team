using Microsoft.EntityFrameworkCore.Migrations;

namespace SWEBackend.Migrations
{
    public partial class makeroomvenuenullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Venues_VenueId",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "VenueId",
                table: "Rooms",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Venues_VenueId",
                table: "Rooms",
                column: "VenueId",
                principalTable: "Venues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Venues_VenueId",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "VenueId",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Venues_VenueId",
                table: "Rooms",
                column: "VenueId",
                principalTable: "Venues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
