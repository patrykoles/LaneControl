using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.MenuItem;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace api.Controllers
{
    [Route("api/menuitem")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemRepository _menuItemRepo;
        public MenuItemController(IMenuItemRepository menuItemRepo)
        {
            _menuItemRepo = menuItemRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] MenuItemQuery query){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var menuItems = await _menuItemRepo.GetAllAsync(query);

            var menuItemDtos = menuItems.Select(x => x.ToMenuItemDto());

            return Ok(menuItemDtos);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var menuItemModel = await _menuItemRepo.GetByIdAsync(id);
            if(menuItemModel == null)
            {
                return NotFound();
            }
            return Ok(menuItemModel.ToMenuItemDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateMenuItemRequestDto menuItemDto)
        {
            Console.WriteLine("Current Price Value: {0}", menuItemDto.CurrentPrice);
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var menuItemModel = menuItemDto.toMenuItemFromCreateMenuItemRequestDto();
            await _menuItemRepo.CreateAsync(menuItemModel);
            return CreatedAtAction(nameof(GetById), new { id = menuItemModel.Id }, menuItemModel.ToMenuItemDto());

        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMenuItemRequestDto menuItemDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var menuItemModel = await _menuItemRepo.UpdateAsync(id, menuItemDto);
            if(menuItemModel == null)
            {
                return NotFound();
            }
            return Ok(menuItemModel.ToMenuItemDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var menuItemModel = await _menuItemRepo.DeleteAsync(id);
            if(menuItemModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}