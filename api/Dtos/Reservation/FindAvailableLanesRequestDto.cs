using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Reservation
{
    public class FindAvailableLanesRequestDto
    {
        [Required]
        public DateTime BeginTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        public int? ReservationId { get; set; }= null;

    }
}