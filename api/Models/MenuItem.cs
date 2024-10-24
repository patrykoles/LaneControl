using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("MenuItem")]
    public class MenuItem
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(3,2)")]
        public decimal CurrentPrice { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


    }
}