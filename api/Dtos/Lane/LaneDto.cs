using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Lane
{
    public class LaneDto
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public int Highscore { get; set; }
        public int AlleyId { get; set; }
    }
}