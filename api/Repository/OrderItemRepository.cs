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
            var menuItem = await _context.MenuItems.FirstOrDefaultAsync(mi => mi.Id == orderItem.MenuItemId);
            if(menuItem == null)
            {
                throw new MenuItemDoesNotExistException("Taka pozycja w menu nie istieje!");
            }
            if(menuItem.CurrentPrice != orderItem.Price)
            {
                throw new PricesDoNotMatchException("Podana cena nie zgadza się z aktualną ceną produktu w Menu!");
            }
            await _context.OrderItems.AddAsync(orderItem);
            await _context.SaveChangesAsync();
            return orderItem;
        }

        public async Task<OrderItem?> DeleteAsync(OrderItem orderItem)
        {
            var existingItem = await _context.OrderItems.FirstOrDefaultAsync(oi => oi.OrderId == orderItem.OrderId && oi.MenuItemId == orderItem.MenuItemId);
            if(existingItem == null)
            {
                return null;
            }
            _context.OrderItems.Remove(existingItem);
            await _context.SaveChangesAsync();
            return existingItem;
        }
    }
}