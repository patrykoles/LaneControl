using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order?> GetByIdAsync(int id)
        {
            return await _context.Orders.Include(o => o.Reservation).Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem).FirstOrDefaultAsync(o => o.Id == id);
        }

        public async Task<List<Order>> GetUserOrdersAsync(AppUser user, OrderQuery query)
        {
            var orders = _context.Orders.AsQueryable();

            orders = orders.Where(o => o.Reservation.AppUserId == user.Id);

            if(query.ReservationId != null)
            {
                orders = orders.Where(o => o.ReservationId == query.ReservationId);
            }
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await orders.OrderBy(o => o.OrderTime).Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem).Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Order?> UpdateSumAsync(int orderId, List<OrderItem> orderItems)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.MenuItem).FirstOrDefaultAsync(o => o.Id == orderId);
            if(order == null)
            {
                return null;
            }

            decimal sum = 0;

            foreach(var orderItem in orderItems)
            {
                sum += orderItem.Price * orderItem.Quantity;
            }

            order.SumPrice = sum;

            await _context.SaveChangesAsync();

            return order;
        }
    }
}