using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OrderItem;
using api.Models;

namespace api.Mappers
{
    public static class OrderItemMappers
    {
        public static OrderItemDto ToOrderItemDto(this OrderItem orderItem)
        {
            return new OrderItemDto
            {
                MenuItemId = orderItem.MenuItemId,
                OrderId = orderItem.OrderId,
                Quantity = orderItem.Quantity,
                Price = orderItem.Price,
                MenuItemName = orderItem.MenuItem.Name
            };
        }

        public static OrderItem ToOrderItemFromCreateOrderItemRequestDto(this CreateOrderItemRequestDto orderItemDto, int orderId)
        {
            return new OrderItem
            {
                OrderId = orderId,
                MenuItemId = orderItemDto.MenuItemId,
                Quantity = orderItemDto.Quantity,
                Price = orderItemDto.Price
            };
        }
    }
}