using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Reservation;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly ILaneRepository _laneRepo;
        public ReservationController(IReservationRepository reservationRepo, UserManager<AppUser> userManager, ILaneRepository laneRepo)
        {
            _reservationRepo = reservationRepo;
            _userManager = userManager;
            _laneRepo = laneRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserReservation([FromQuery] ReservationQuery query)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null){
                return Forbid();
            }
            var reservations = await _reservationRepo.GetUserReservationsAsync(appUser, query);
            var reservationDtos = reservations.Select(x => x.ToReservationDto());

            return Ok(reservationDtos);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            var resrevationModel = await _reservationRepo.GetByIdAsync(id);
            if(resrevationModel == null)
            {
                return NotFound();
            }
            if(resrevationModel.AppUserId != appUser.Id)
            {
                return Forbid();
            }
            return Ok(resrevationModel.ToReservationDto());
        }

        [HttpPost]
        [Route("{laneId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int laneId, [FromBody] CreateReservationRequestDto reservationDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            if(!(await _laneRepo.LaneExists(laneId)))
            {
                return BadRequest("Taki tor nie istnieje!");
            }
            var reservation = reservationDto.ToReservationFromCreateReservationRequestDto(laneId, appUser.Id);
            if(!(_reservationRepo.CheckIfDateIsNotInThePast(reservation)))
            {
                return BadRequest("Nie można dokonać rezerwacji w przeszłości!");
            }
            if(!(await _reservationRepo.CheckDates(reservation, laneId)))
            {
                return BadRequest("Podane godziny rezerwacji nie mieszczą się w godzinach otwarcia kręgielni!");
            }
            if(!(await _reservationRepo.CheckAvailability(reservation, laneId, null)))
            {
                return BadRequest("Podane godziny rezerwacji nie są dostępne!");
            }
            await _reservationRepo.CreateAsync(reservation);
            return CreatedAtAction(nameof(GetById), new { id = reservation.Id }, reservation.ToReservationDto());

        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateReservationRequestDto reservationDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            var oldReservation = await _reservationRepo.GetByIdAsync(id);
            if(oldReservation == null)
            {
                return NotFound();
            }
            if(oldReservation.AppUserId != appUser.Id)
            {
                return Forbid();
            }
            var newReservation = reservationDto.ToReservationFromUpdateReservationRequestDto(oldReservation.LaneId, appUser.Id);
            if(!(_reservationRepo.CheckIfDateIsNotInThePast(oldReservation)))
            {
                return BadRequest("Nie można zmieniać rezerwacji która już się odbyła!");
            }
            if(!(_reservationRepo.CheckIfDateIsNotInThePast(newReservation)))
            {
                return BadRequest("Nie można dokonać rezerwacji w przeszłości!");
            }
            if(!(await _reservationRepo.CheckDates(newReservation, oldReservation.LaneId)))
            {
                return BadRequest("Podane godziny rezerwacji nie mieszczą się w godzinach otwarcia kręgielni!");
            }
            if(!(await _reservationRepo.CheckAvailability(newReservation, oldReservation.LaneId, oldReservation.Id)))
            {
                return BadRequest("Podane godziny rezerwacji nie są dostępne!");
            }

            var updatedReservation = await _reservationRepo.UpdateAsync(id, reservationDto);

            if(updatedReservation == null)
            {
                return NotFound();
            }
            return Ok(updatedReservation.ToReservationDto());
            
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            var oldReservation = await _reservationRepo.GetByIdAsync(id);
            if(oldReservation == null)
            {
                return NotFound();
            }
            if(oldReservation.AppUserId != appUser.Id)
            {
                return Forbid();
            }
            if(!(_reservationRepo.CheckIfDateIsNotInThePast(oldReservation)))
            {
                return BadRequest("Nie można anulować rezerwacji która już się odbyła!");
            }

            var reservation = await _reservationRepo.DeleteAsync(id);
            if(reservation == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}