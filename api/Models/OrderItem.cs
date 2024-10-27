using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("OrderItem")]
    public class OrderItem
    {
        public int MenuItemId { get; set; }

        public int OrderId { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Price { get; set; }

        public MenuItem? MenuItem { get; set; }

        public Order? Order { get; set; }
    }
}