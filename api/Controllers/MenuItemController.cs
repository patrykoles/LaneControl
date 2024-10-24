using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
    }
}