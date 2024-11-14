using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Reservation;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrderRepository _orderRepo;
        public ReservationRepository(ApplicationDBContext context, IOrderRepository orderRepo)
        {
            _context = context;
            _orderRepo = orderRepo;
        }

        public async Task<bool> CheckAvailability(Reservation reservationModel, int laneId, int? oldReservationId)
        {
            var laneModel = await _context.Lanes.Include(x => x.Alley).FirstOrDefaultAsync(x => x.Id == laneId);
            if(laneModel == null || laneModel.Alley == null)
            {
                return false;
            }
            var beginHours = reservationModel.BeginTime.TimeOfDay;
            var endHours = reservationModel.EndTime.TimeOfDay;

            return !await _context.Reservations.AnyAsync(r => r.Id != oldReservationId && r.LaneId == laneId 
                && (((r.BeginTime.Date == reservationModel.BeginTime.Date)&&(r.BeginTime.TimeOfDay >= beginHours && r.BeginTime.TimeOfDay <= endHours))
                ||((r.EndTime.Date == reservationModel.EndTime.Date)&&(r.EndTime.TimeOfDay >= beginHours && r.EndTime.TimeOfDay <= endHours))));

        }

        public async Task<bool> CheckDates(Reservation reservationModel, int laneId)
        {
            var laneModel = await _context.Lanes.Include(x => x.Alley).FirstOrDefaultAsync(x => x.Id == laneId);
            if(laneModel == null || laneModel.Alley == null)
            {
                return false;
            }
            var beginTime = reservationModel.BeginTime;
            var endTime = reservationModel.EndTime;

            var beginHours = beginTime.TimeOfDay;
            var endHours = endTime.TimeOfDay;

            var openingTime = laneModel.Alley.OpeningTime;
            var closingTime = laneModel.Alley.ClosingTime;

            if(openingTime == closingTime)
            {
                return false;
            }
            if(closingTime > openingTime){
                if (beginTime.Date != endTime.Date)
                {
                    return false;
                }
                if(endHours > closingTime || beginHours < openingTime || beginHours > closingTime || endHours < openingTime)
                {
                    return false;
                }
                if(endHours < beginHours)
                {
                    return false;
                }
            }
            else if(closingTime < openingTime)
            {
                if (beginTime.Date != endTime.Date && endTime.Date != beginTime.Date.AddDays(1))
                {
                    return false;
                }
                if(!(beginHours > openingTime || beginHours < closingTime) || !(endHours < closingTime || endHours > openingTime))
                {
                    return false;
                }
                if(!(beginHours > openingTime && endHours < closingTime))
                {
                    if(endHours < beginHours)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        public bool CheckIfDateIsNotInThePast(Reservation reservationModel)
        {
            return reservationModel.BeginTime > DateTime.Now;
        }

        public bool CheckIfReservationIsOngoing(Reservation reservationModel)
        {
            return (reservationModel.BeginTime <= DateTime.Now && reservationModel.EndTime >= DateTime.Now.AddMinutes(15));
        }

        public async Task<Reservation> CreateAsync(Reservation reservationModel)
        {
            await _context.Reservations.AddAsync(reservationModel);
            await _context.SaveChangesAsync();
            return reservationModel;
        }

        public async Task<Reservation?> DeleteAsync(int id)
        {
            var reservationModel = await _context.Reservations.FindAsync(id);
            if(reservationModel == null)
            {
                return null;
            }
            var orders = await _context.Orders.Where(o => o.ReservationId == id).ToListAsync();
            foreach(var order in orders)
            {
                await _orderRepo.DeleteAsync(order.Id);
            }

            _context.Reservations.Remove(reservationModel);
            await _context.SaveChangesAsync();

            return reservationModel;
        }

        public async Task<List<Lane>> FindAvailableLanes(Reservation? reservationModel, int alleyId, AppUser user, DateTime beginTime, DateTime endTime)
        {
            List<Lane> lanes = new List<Lane>();
            var alleyModel = await _context.Alleys.FirstOrDefaultAsync(a => a.Id == alleyId);
            if(alleyModel == null)
            {
                return lanes;
            }
            var beginTimeHours = beginTime.TimeOfDay;
            var endTimeHours = endTime.TimeOfDay;
            if(
                (alleyModel.ClosingTime > alleyModel.OpeningTime && beginTimeHours < alleyModel.OpeningTime && beginTimeHours < alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime > alleyModel.OpeningTime && endTimeHours < alleyModel.OpeningTime && endTimeHours < alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime > alleyModel.OpeningTime && beginTimeHours > alleyModel.OpeningTime && beginTimeHours > alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime > alleyModel.OpeningTime && endTimeHours > alleyModel.OpeningTime && endTimeHours > alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime < alleyModel.OpeningTime && beginTimeHours < alleyModel.OpeningTime && beginTimeHours > alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime < alleyModel.OpeningTime && endTimeHours < alleyModel.OpeningTime && endTimeHours > alleyModel.ClosingTime) ||
                (alleyModel.ClosingTime > alleyModel.OpeningTime && beginTime.Date != endTime.Date) ||
                (alleyModel.ClosingTime < alleyModel.OpeningTime && !((beginTime.Date != endTime.Date) || (beginTime.AddDays(1).Date != endTime.Date)))
            )
            {
                return lanes;
            }
            var laneIds = await _context.Lanes.Where(l => l.AlleyId == alleyId).Select(l => l.Id).ToListAsync();
            var reservationLaneIds = await _context.Reservations
                .Where(r => laneIds.Contains(r.LaneId) 
                && ((r.BeginTime < r.EndTime && ((beginTime >= r.BeginTime && beginTime <= r.EndTime) || (endTime >= r.BeginTime && endTime <= r.EndTime)))
                ||(r.BeginTime > r.EndTime && (beginTime >= r.BeginTime || endTime <= r.EndTime))) 
                && (reservationModel == null || r.Id != reservationModel.Id))
                .Select(r => r.LaneId).Distinct().ToListAsync();
            var newLanes = await _context.Lanes.Where(l => !reservationLaneIds.Contains(l.Id) && l.AlleyId == alleyId).ToListAsync();
            return newLanes;
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _context.Reservations.Include(r => r.Lane).ThenInclude(l => l.Alley).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Reservation>> GetUserReservationsAsync(AppUser user, ReservationQuery query)
        {
            var reservations = _context.Reservations.AsQueryable();
            reservations = reservations.Where(x => x.AppUserId == user.Id);
            if(query.isExpired)
            {
                reservations = reservations.Where(r => r.EndTime < DateTime.Now);
            }
            else
            {
                reservations = reservations.Where(r => r.EndTime >= DateTime.Now);
            }
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await reservations.OrderBy(x => x.BeginTime).Include(r => r.Lane).ThenInclude(l => l.Alley).Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Reservation?> UpdateAsync(int id, UpdateReservationRequestDto reserevationDto)
        {
            var existingReservation = await _context.Reservations.FindAsync(id);
            if(existingReservation == null)
            {
                return null;
            }
            existingReservation.BeginTime = reserevationDto.BeginTime;
            existingReservation.EndTime = reserevationDto.EndTime;
            await _context.SaveChangesAsync();
            return existingReservation;
        }
    }
}