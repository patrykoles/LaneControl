using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Alley;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/alley")]
    [ApiController]
    public class AlleyController : ControllerBase
    {
        private readonly IAlleyRepository _alleyRepo;
        public AlleyController( IAlleyRepository alleyRepo)
        {
            _alleyRepo = alleyRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] AlleyQuery query)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var alleys = await _alleyRepo.GetAllAsync(query);
            
            var alleyDtos = alleys.Select(s => s.ToAlleyDto());

            return Ok(alleyDtos);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var alley = await _alleyRepo.GetByIdAsync(id);
            
            if(alley == null)
            {
                return NotFound();
            }

            return Ok(alley.ToAlleyDto());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateAlleyRequestDto alleyDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var alleyModel = alleyDto.ToAlleyFromCreateAlleyRequestDto();
            await _alleyRepo.CreateAsync(alleyModel);
            return CreatedAtAction(nameof(GetById), new { id = alleyModel.Id }, alleyModel.ToAlleyDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAlleyRequestDto updateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var alleyModel = await _alleyRepo.UpdateAsync(id, updateDto);

            if(alleyModel == null)
            {
                return NotFound();
            }

            return Ok(alleyModel.ToAlleyDto());

        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var alleyModel = await _alleyRepo.DeleteAsync(id);

            if(alleyModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}