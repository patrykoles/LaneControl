using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Alley;
using api.Models;

namespace api.Mappers
{
    public static class AlleyMappers
    {
        public static AlleyDto ToAlleyDto(this Alley alleyModel){
            return new AlleyDto
            {
                Id = alleyModel.Id,
                Name = alleyModel.Name,
                City = alleyModel.City,
                Address = alleyModel.Address,
                OpeningTime = alleyModel.OpeningTime,
                ClosingTime = alleyModel.ClosingTime
            };
        }

        public static Alley ToAlleyFromCreateAlleyRequestDto(this CreateAlleyRequestDto alleyDto)
        {
            return new Alley
            {
                Name = alleyDto.Name,
                City = alleyDto.City,
                Address = alleyDto.Address,
                OpeningTime = alleyDto.OpeningTime,
                ClosingTime = alleyDto.ClosingTime
            };
        }
    }
}