using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.OrderItem
{
    public class CreateOrderItemRequestDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int MenuItemId { get; set; }

        [Required]
        [Range(0, 99)]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, 999.99)]
        public decimal Price { get; set; }
    }
}