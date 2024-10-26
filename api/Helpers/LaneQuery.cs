using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class LaneQuery
    {
        public int? AlleyId { get; set; } = null;
        public int PageNumber { get; set; } = 1;

        public int PageSize { get; set; } = 40;
    }
}