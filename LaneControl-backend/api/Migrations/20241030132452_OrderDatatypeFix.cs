using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class OrderDatatypeFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bf9cbe94-c09e-4fc2-b082-33cb1c1103f0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f8198a67-5e2c-42be-9f43-8c6434291df7");

            migrationBuilder.AlterColumn<decimal>(
                name: "SumPrice",
                table: "Order",
                type: "decimal(8,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(6,2)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "06078e2a-335e-4316-88ff-057a1e4fcdff", null, "Admin", "ADMIN" },
                    { "7d81da1a-a7be-4753-8262-d2765598a49a", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "06078e2a-335e-4316-88ff-057a1e4fcdff");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7d81da1a-a7be-4753-8262-d2765598a49a");

            migrationBuilder.AlterColumn<decimal>(
                name: "SumPrice",
                table: "Order",
                type: "decimal(6,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(8,2)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bf9cbe94-c09e-4fc2-b082-33cb1c1103f0", null, "User", "USER" },
                    { "f8198a67-5e2c-42be-9f43-8c6434291df7", null, "Admin", "ADMIN" }
                });
        }
    }
}
