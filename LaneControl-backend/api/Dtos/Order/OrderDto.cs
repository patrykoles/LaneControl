using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OrderItem;

namespace api.Dtos.Order
{
    public class OrderDto
    {
        public int Id { get; set; }

        public decimal SumPrice { get; set; }

        public DateTime OrderTime { get; set; } = DateTime.Now;

        public int ReservationId { get; set; }

        public List<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
    }
}