using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Alley
{
    public class UpdateAlleyRequestDto
    {
        public string Name { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public TimeSpan OpeningTime { get; set; }

        public TimeSpan ClosingTime { get; set; }
    }
}