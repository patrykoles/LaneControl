using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.MenuItem;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MenuItemRepository : IMenuItemRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IOrderItemRepository _orderItemRepo;
        public MenuItemRepository(ApplicationDBContext context, IOrderItemRepository orderItemRepo)
        {
            _context = context;
            _orderItemRepo = orderItemRepo;
        }

        public async Task<MenuItem> CreateAsync(MenuItem menuItemModel)
        {
            await _context.MenuItems.AddAsync(menuItemModel);
            await _context.SaveChangesAsync();
            return menuItemModel;
        }

        public async Task<MenuItem?> DeleteAsync(int id)
        {
            var menuItemModel = await _context.MenuItems.FindAsync(id);
            if(menuItemModel == null)
            {
                return null;
            }
            var originalItems = await _context.OrderItems.Where(oi => oi.MenuItemId == id).ToListAsync();
            var orderItems = originalItems?.ToList();
            if(orderItems != null)
            {
                foreach(var orderItem in orderItems)
                {
                    await _orderItemRepo.DeleteAsync(orderItem);
                }
            }
            _context.Remove(menuItemModel);
            await _context.SaveChangesAsync();
            return menuItemModel;
        }

        public async Task<List<MenuItem>> GetAllAsync(MenuItemQuery query)
        {
            var menuItems = _context.MenuItems.AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.Name))
            {
                menuItems = menuItems.Where(x => x.Name.Contains(query.Name));
            }

            if(!string.IsNullOrWhiteSpace(query.Category))
            {
                menuItems = menuItems.Where(x => x.Category.Contains(query.Category));
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await menuItems.Skip(skipNumber).Take(query.PageSize).OrderBy(x => x.Category).ThenBy(x => x.Name).ToListAsync();            
        }

        public async Task<MenuItem?> GetByIdAsync(int id)
        {
            return await _context.MenuItems.FindAsync(id);
        }

        public async Task<MenuItem?> UpdateAsync(int id, UpdateMenuItemRequestDto menuItemDto)
        {
            var menuItemModel = await _context.MenuItems.FindAsync(id);
            if(menuItemModel == null)
            {
                return null;
            }
            menuItemModel.Name = menuItemDto.Name;
            menuItemModel.Description = menuItemDto.Description;
            menuItemModel.CurrentPrice = menuItemDto.CurrentPrice;
            menuItemModel.Category = menuItemDto.Category;

            await _context.SaveChangesAsync();

            return menuItemModel;
        }
    }
}