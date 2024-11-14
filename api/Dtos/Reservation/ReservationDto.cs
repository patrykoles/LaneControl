using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }

        public DateTime BeginTime { get; set; }

        public DateTime EndTime { get; set; }

        public int LaneNumber { get; set; }

        public string AlleyName { get; set; } = string.Empty;

        public string AlleyCity { get; set; } = string.Empty;

        public string AlleyAddress { get; set; } = string.Empty;

        public int LaneId { get; set; }

        public int AlleyId { get; set; }
    }
}