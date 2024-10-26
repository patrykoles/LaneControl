using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Lane
{
    public class CreateLaneRequestDto
    {
        public int Number { get; set; }

        public int Highscore { get; set; }
    }
}