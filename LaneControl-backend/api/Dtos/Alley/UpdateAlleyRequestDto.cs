using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Alley
{
    public class UpdateAlleyRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Nazwa musi mieć co najmniej 5 znaków!")]
        [MaxLength(50, ErrorMessage = "Nazwa może mieć maksymalnie 50 znaków!")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(2, ErrorMessage = "Miasto musi mieć co najmniej 2 znaki!")]
        [MaxLength(50, ErrorMessage ="Miasto może mieć maksymalnie 50 znaków!")]
        public string City { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Adres musi mieć co najmniej 3 znaki!")]
        [MaxLength(100, ErrorMessage ="Adres może mieć maksymalnie 100 znaków!")]
        public string Address { get; set; } = string.Empty;

        [Required]
        public TimeSpan OpeningTime { get; set; }

        [Required]
        public TimeSpan ClosingTime { get; set; }
    }
}