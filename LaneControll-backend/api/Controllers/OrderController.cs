using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Order;
using api.Dtos.OrderItem;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace api.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IReservationRepository _reservationRepo;
        private readonly IOrderItemRepository _orderItemRepo;
        public OrderController(IOrderRepository orderRepo, UserManager<AppUser> userManager, IReservationRepository reservationRepo, IOrderItemRepository orderItemRepo)
        {
            _orderRepo = orderRepo;
            _userManager = userManager;
            _reservationRepo = reservationRepo;
            _orderItemRepo = orderItemRepo;
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
            var order = await _orderRepo.GetByIdAsync(id);
            if(order == null)
            {
                return NotFound();
            }
            var reservation = await _reservationRepo.GetByIdAsync(order.ReservationId);
            if(reservation == null)
            {
                return NotFound();
            }
            if(reservation.AppUserId != appUser.Id)
            {
                return Forbid();
            }

            var orderItems = order.OrderItems;
            var orderItemDtos = orderItems
                .Select(oi => oi.ToOrderItemDto())
                .ToList();
            var orderDto = order.ToOrderDto(orderItemDtos);
            return Ok(orderDto);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserOrders([FromQuery] OrderQuery query)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            var orders = await _orderRepo.GetUserOrdersAsync(appUser, query);

            var orderDtos = orders
                .Select(o => o.ToOrderDto(o.OrderItems.Select(oi => oi.ToOrderItemDto()).ToList()))
                .ToList();

            return Ok(orderDtos);

        }

        [HttpPost]
        [Route("{reservationId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int reservationId, [FromBody] CreateOrderRequestDto orderDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            if(appUser == null)
            {
                return Forbid();
            }
            var reservation = await _reservationRepo.GetByIdAsync(reservationId);
            if(reservation == null)
            {
                return BadRequest("Podana rezerwacja nie istnieje!");
            }
            if(reservation.AppUserId != appUser.Id)
            {
                return Forbid();
            }
            if(!_reservationRepo.CheckIfReservationIsOngoing(reservation))
            {
                return BadRequest("Zamówień można dokonywać tylko dla aktualnej rezerwacji do 15 minut przed jej zakończeniem!");
            }
            var orderItemDtos = orderDto.orderItemRequests;
            if(orderItemDtos.IsNullOrEmpty())
            {
                return BadRequest("Nie można złozyć pustego zamówienia!");
            }
            var order = new Order
            {
                SumPrice = 0,
                ReservationId = reservation.Id
            };

            var createdOrder = await _orderRepo.CreateAsync(order);

            

            var orderItems = orderItemDtos.Select(oi => oi.ToOrderItemFromCreateOrderItemRequestDto(createdOrder.Id)).ToList();

            List<OrderItem> createdOrderItems = new List<OrderItem>();

            foreach(var orderItem in orderItems)
            {
                try
                {
                    var createdItem = await _orderItemRepo.CreateAsync(orderItem);
                    createdOrderItems.Add(createdItem);
                }
                catch(Exception e)
                {
                    foreach(var oi in createdOrderItems)
                    {
                        await _orderItemRepo.DeleteAsync(oi);
                    }
                    await _orderRepo.DeleteAsync(createdOrder.Id);
                    return BadRequest(e.Message);
                }
            }

            createdOrder = await _orderRepo.UpdateSumAsync(createdOrder.Id, createdOrderItems);

            if(createdOrder == null)
            {
                return BadRequest("Błąd przy tworzeniu zamówienia!");
            }

            return CreatedAtAction(nameof(GetById), new { id = createdOrder.Id }, createdOrder.ToOrderDto(createdOrderItems.Select(oi => oi.ToOrderItemDto()).ToList()));
            
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
            var order = await _orderRepo.GetByIdAsync(id);
            if(order == null)
            {
                return NotFound();
            }
            if(order.Reservation.AppUserId != appUser.Id)
            {
                return Forbid();
            }
            if(_orderRepo.CheckIfOrderHasBeenDelivered(order))
            {
                return BadRequest("Możesz anulować zamówienie tylko w ciągu pierwszych 10 minut od jego złożenia");
            }
            var deletedOrder = await _orderRepo.DeleteAsync(id);

            if(deletedOrder == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}