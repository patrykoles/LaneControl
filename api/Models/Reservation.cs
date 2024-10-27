using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        public int Id { get; set; }

        public DateTime BeginTime { get; set; }

        public DateTime EndTime { get; set; }

        public int LaneId { get; set; }

        public string AppUserId { get; set; } =string.Empty;

        public AppUser? AppUser { get; set; }

        public Lane? Lane { get; set; }

        public List<Order> Orders { get; set; } = new List<Order>();
    }
}