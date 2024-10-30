using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Reservation;
using api.Models;

namespace api.Mappers
{
    public static class ReservationMappers
    {
        public static ReservationDto ToReservationDto(this Reservation reservationModel)
        {
            return new ReservationDto
            {
                Id = reservationModel.Id,
                BeginTime = reservationModel.BeginTime,
                EndTime = reservationModel.EndTime,
                LaneNumber = reservationModel.Lane.Number,
                AlleyName = reservationModel.Lane.Alley.Name,
                AlleyCity = reservationModel.Lane.Alley.City,
                AlleyAddress = reservationModel.Lane.Alley.Address,
                LaneId = reservationModel.LaneId
            };
        }

        public static Reservation ToReservationFromCreateReservationRequestDto(this CreateReservationRequestDto reservationDto, int laneId, string appUserId)
        {
            return new Reservation
            {
                BeginTime = reservationDto.BeginTime,
                EndTime = reservationDto.EndTime,
                LaneId = laneId,
                AppUserId = appUserId
            };
        }

        public static Reservation ToReservationFromUpdateReservationRequestDto(this UpdateReservationRequestDto reservationDto, int laneId, string appUserId)
        {
            return new Reservation
            {
                BeginTime = reservationDto.BeginTime,
                EndTime = reservationDto.EndTime,
                LaneId = laneId,
                AppUserId = appUserId
            };
        }
    }
}