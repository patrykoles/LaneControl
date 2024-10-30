using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.OrderItem
{
    public class OrderItemDto
    {
        public int MenuItemId { get; set; }

        public int OrderId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public string MenuItemName { get; set; } = string.Empty;
    }
}