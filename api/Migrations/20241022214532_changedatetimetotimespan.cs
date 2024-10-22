using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class changedatetimetotimespan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lane",
                table: "Lane");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Alley",
                table: "Alley");

            migrationBuilder.RenameTable(
                name: "Lane",
                newName: "Lanes");

            migrationBuilder.RenameTable(
                name: "Alley",
                newName: "Alleys");

            migrationBuilder.RenameIndex(
                name: "IX_Lane_AlleyId",
                table: "Lanes",
                newName: "IX_Lanes_AlleyId");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "OpeningTime",
                table: "Alleys",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "ClosingTime",
                table: "Alleys",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lanes",
                table: "Lanes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Alleys",
                table: "Alleys",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lanes_Alleys_AlleyId",
                table: "Lanes",
                column: "AlleyId",
                principalTable: "Alleys",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lanes_Alleys_AlleyId",
                table: "Lanes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lanes",
                table: "Lanes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Alleys",
                table: "Alleys");

            migrationBuilder.RenameTable(
                name: "Lanes",
                newName: "Lane");

            migrationBuilder.RenameTable(
                name: "Alleys",
                newName: "Alley");

            migrationBuilder.RenameIndex(
                name: "IX_Lanes_AlleyId",
                table: "Lane",
                newName: "IX_Lane_AlleyId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "OpeningTime",
                table: "Alley",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ClosingTime",
                table: "Alley",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lane",
                table: "Lane",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Alley",
                table: "Alley",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane",
                column: "AlleyId",
                principalTable: "Alley",
                principalColumn: "Id");
        }
    }
}
