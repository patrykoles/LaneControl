using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/alley")]
    [ApiController]
    public class AlleyController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public AlleyController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var alleys = _context.Alleys.ToList()
            .Select(s => s.ToAlleyDto());


            return Ok(alleys);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var alley = _context.Alleys.Find(id);
            
            if(alley == null)
            {
                return NotFound();
            }

            return Ok(alley.ToAlleyDto());
        }
    }
}