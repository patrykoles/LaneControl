using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Reservation;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetUserReservationsAsync(AppUser user, ReservationQuery query);

        Task<Reservation?> GetByIdAsync(int id);

        Task<Reservation> CreateAsync(Reservation reservationModel);

        Task<bool> CheckDates(Reservation reservationModel, int laneId);

        Task<bool> CheckAvailability(Reservation reservationModel, int laneId, int? oldReservationId);

        Task<Reservation?> UpdateAsync(int id, UpdateReservationRequestDto reserevationDto);

        bool CheckIfDateIsNotInThePast(Reservation reservationModel);

        Task<Reservation?> DeleteAsync(int id);

        bool CheckIfReservationIsOngoing(Reservation reservationModel);
    }
}