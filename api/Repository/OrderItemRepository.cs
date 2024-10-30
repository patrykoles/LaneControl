using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Exceptions;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class OrderItemRepository : IOrderItemRepository
    {
        private readonly ApplicationDBContext _context;
        public OrderItemRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<OrderItem> CreateAsync(OrderItem orderItem)
        {
            var existingItem = await _context.OrderItems.FirstOrDefaultAsync(oi => oi.OrderId == orderItem.OrderId && oi.MenuItemId == orderItem.MenuItemId);
            if(existingItem != null)
            {
                throw new EntityAlreadyExistsException("Nie można dodawać kilka razy tej samej pozycji z Menu w jednym zamówieniu");
            }
            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }
    }
}