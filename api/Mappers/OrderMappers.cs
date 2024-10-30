using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Dtos.OrderItem;
using api.Models;

namespace api.Mappers
{
    public static class OrderMappers
    {
        public static OrderDto ToOrderDto(this Order order, List<OrderItemDto> orderItems)
        {
            return new OrderDto
            {
                Id = order.Id,
                SumPrice = order.SumPrice,
                OrderTime = order.OrderTime,
                ReservationId = order.ReservationId,
                OrderItems = orderItems
            };
        }
    }
}