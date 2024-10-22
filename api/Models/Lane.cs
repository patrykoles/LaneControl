using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Lane
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public int Highscore { get; set; }
        public int? AlleyId { get; set; }

        public Alley? Alley { get; set; }
    }
}