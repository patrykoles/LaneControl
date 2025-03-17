using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Order")]
    public class Order
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        public decimal SumPrice { get; set; }

        public DateTime OrderTime { get; set; } = DateTime.Now;

        public int ReservationId { get; set; }

        public Reservation? Reservation { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}