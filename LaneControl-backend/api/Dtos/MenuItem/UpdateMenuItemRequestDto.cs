using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.MenuItem
{
    public class UpdateMenuItemRequestDto
    {
        [Required]
        [MinLength(3, ErrorMessage = "Nazwa musi mieć co najmniej 3 znaki!")]
        [MaxLength(50, ErrorMessage = "Nazwa może mieć maksymalnie 50 znaków!")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(10, ErrorMessage = "Opis musi mieć co najmniej 10 znaków!")]
        [MaxLength(150, ErrorMessage = "Opis może mieć maksymalnie 150 znaków!")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MinLength(3, ErrorMessage = "Kategoria musi mieć co najmniej 3 znaki!")]
        [MaxLength(40, ErrorMessage = "Kategoria może mieć maksymalnie 40 znaków!")]
        public string Category { get; set; } = string.Empty;

        [Required]
        [Range(0.01, 999.99)]
        public decimal CurrentPrice { get; set; }
    }
}