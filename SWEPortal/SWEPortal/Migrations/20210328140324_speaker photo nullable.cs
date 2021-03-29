using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SWEBackend.Migrations
{
    public partial class speakerphotonullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Speakers_SWEFile_SpeakerPhotoId",
                table: "Speakers");

            migrationBuilder.AlterColumn<Guid>(
                name: "SpeakerPhotoId",
                table: "Speakers",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Speakers_SWEFile_SpeakerPhotoId",
                table: "Speakers",
                column: "SpeakerPhotoId",
                principalTable: "SWEFile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Speakers_SWEFile_SpeakerPhotoId",
                table: "Speakers");

            migrationBuilder.AlterColumn<Guid>(
                name: "SpeakerPhotoId",
                table: "Speakers",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Speakers_SWEFile_SpeakerPhotoId",
                table: "Speakers",
                column: "SpeakerPhotoId",
                principalTable: "SWEFile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
