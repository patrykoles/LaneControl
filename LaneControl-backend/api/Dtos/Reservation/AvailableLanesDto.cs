using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Lane;

namespace api.Dtos.Reservation
{
    public class AvailableLanesDto
    {
        public List<LaneDto> Lanes { get; set; } = new List<LaneDto>();
    }
}