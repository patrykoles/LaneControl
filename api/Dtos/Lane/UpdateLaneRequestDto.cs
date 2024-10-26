using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Lane
{
    public class UpdateLaneRequestDto
    {
        [Required]
        [Range(1, 100)]
        public int Number { get; set; }

        [Required]
        [Range(0, 300)]
        public int Highscore { get; set; }

    }
}