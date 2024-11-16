using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class AdminReservationQuery
    {
        public DateTime? Day { get; set; } = null;

        public string? AlleyName { get; set; } = null;

        public int? LaneNumber { get; set; } = null;

        public string? City { get; set; } = null;

        public string? UserName { get;  set; } = null;

        public bool isExpired { get; set; } = false;
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 100;
    }
}