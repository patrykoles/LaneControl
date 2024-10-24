using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class LaneAlleyIdNotNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9179634-37ef-4944-8a12-d0699898ebea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7cba744-dd1b-48fd-8e74-853a8f65690c");

            migrationBuilder.AlterColumn<int>(
                name: "AlleyId",
                table: "Lane",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6f11656e-6a08-4e54-88f1-f9da6819a32b", null, "Admin", "ADMIN" },
                    { "6ff89a79-4a06-404a-b360-373b8a2a114c", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane",
                column: "AlleyId",
                principalTable: "Alley",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f11656e-6a08-4e54-88f1-f9da6819a32b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ff89a79-4a06-404a-b360-373b8a2a114c");

            migrationBuilder.AlterColumn<int>(
                name: "AlleyId",
                table: "Lane",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d9179634-37ef-4944-8a12-d0699898ebea", null, "User", "USER" },
                    { "f7cba744-dd1b-48fd-8e74-853a8f65690c", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane",
                column: "AlleyId",
                principalTable: "Alley",
                principalColumn: "Id");
        }
    }
}
