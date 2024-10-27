using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.MenuItem;
using api.Models;

namespace api.Mappers
{
    public static class MenuItemMappers
    {
        public static MenuItemDto ToMenuItemDto(this MenuItem menuItemModel)
        {
            return new MenuItemDto
            {
                Id = menuItemModel.Id,
                Name = menuItemModel.Name,
                Description = menuItemModel.Description,
                Category = menuItemModel.Category,
                CurrentPrice = menuItemModel.CurrentPrice
            };
        }

        public static MenuItem toMenuItemFromCreateMenuItemRequestDto(this CreateMenuItemRequestDto menuItemDto)
        {
            return new MenuItem
            {
                Name = menuItemDto.Name,
                Description = menuItemDto.Description,
                Category = menuItemDto.Category,
                CurrentPrice = menuItemDto.CurrentPrice
            };
        }
    }
}