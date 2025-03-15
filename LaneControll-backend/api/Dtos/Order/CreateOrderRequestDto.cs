using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.OrderItem;

namespace api.Dtos.Order
{
    public class CreateOrderRequestDto
    {
        [Required]
        public List<CreateOrderItemRequestDto> orderItemRequests { get; set; } = new List<CreateOrderItemRequestDto>();
    }
}