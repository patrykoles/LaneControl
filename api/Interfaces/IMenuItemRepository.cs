using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.MenuItem;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IMenuItemRepository
    {
        public Task<List<MenuItem>> GetAllAsync(MenuItemQuery query);

        public Task<MenuItem?> GetByIdAsync(int id);

        public Task<MenuItem> CreateAsync(MenuItem menuItemModel);

        public Task<MenuItem?> UpdateAsync(int id, UpdateMenuItemRequestDto menuItemDto);

        public Task<MenuItem?> DeleteAsync(int id);
    }
}