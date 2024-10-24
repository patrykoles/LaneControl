using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FullStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2daa66ad-592e-4f03-a87c-1f570c51acc1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ebbf6eee-446b-4c99-9791-f4c18cf0cc2e");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lane",
                table: "Lane",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Alley",
                table: "Alley",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "MenuItem",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentPrice = table.Column<decimal>(type: "decimal(3,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BeginTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LaneId = table.Column<int>(type: "int", nullable: false),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservation_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservation_Lane_LaneId",
                        column: x => x.LaneId,
                        principalTable: "Lane",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SumPrice = table.Column<decimal>(type: "decimal(6,2)", nullable: false),
                    OrderTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReservationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Reservation_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "Reservation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    MenuItemId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(3,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => new { x.MenuItemId, x.OrderId });
                    table.ForeignKey(
                        name: "FK_OrderItem_MenuItem_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItem_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "d9179634-37ef-4944-8a12-d0699898ebea", null, "User", "USER" },
                    { "f7cba744-dd1b-48fd-8e74-853a8f65690c", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Order_ReservationId",
                table: "Order",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                table: "OrderItem",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_AppUserId",
                table: "Reservation",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_LaneId",
                table: "Reservation",
                column: "LaneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane",
                column: "AlleyId",
                principalTable: "Alley",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lane_Alley_AlleyId",
                table: "Lane");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "MenuItem");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lane",
                table: "Lane");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Alley",
                table: "Alley");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9179634-37ef-4944-8a12-d0699898ebea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7cba744-dd1b-48fd-8e74-853a8f65690c");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lanes",
                table: "Lanes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Alleys",
                table: "Alleys",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2daa66ad-592e-4f03-a87c-1f570c51acc1", null, "Admin", "ADMIN" },
                    { "ebbf6eee-446b-4c99-9791-f4c18cf0cc2e", null, "User", "USER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Lanes_Alleys_AlleyId",
                table: "Lanes",
                column: "AlleyId",
                principalTable: "Alleys",
                principalColumn: "Id");
        }
    }
}
