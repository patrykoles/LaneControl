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
        public DateTime beginTime { get; set; }

        [Required]
        public DateTime endTime { get; set; }

        public int? reservationId { get; set; }= null;

    }
}