using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Lane;
using api.Models;

namespace api.Mappers
{
    public static class LaneMappers
    {
        public static LaneDto ToLaneDto(this Lane laneModel)
        {
            return new LaneDto
            {
                Id = laneModel.Id,
                Number = laneModel.Number,
                Highscore = laneModel.Highscore,
                AlleyId = laneModel.AlleyId
            };


        }

        public static Lane ToLaneFromCreateLaneRequestDto(this CreateLaneRequestDto laneDto, int alleyId)
        {
            return new Lane
            {
                Number = laneDto.Number,
                Highscore = laneDto.Highscore,
                AlleyId = alleyId
            };
        }
    }
}