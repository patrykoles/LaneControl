using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Lane;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace api.Controllers
{
    [Route("api/lane")]
    [ApiController]
    public class LaneController : ControllerBase
    {
        private readonly ILaneRepository _laneRepo;
        private readonly IAlleyRepository _alleyRepo;
        public LaneController(ILaneRepository laneRepo, IAlleyRepository alleyRepo)
        {
            _laneRepo = laneRepo;
            _alleyRepo = alleyRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] LaneQuery query)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var lanes = await _laneRepo.GetAllAsync(query);

            var laneDtos = lanes.Select(x => x.ToLaneDto());

            return Ok(laneDtos);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var lane = await _laneRepo.GetByIdAsync(id);
            if(lane == null){
                return NotFound();
            }
            return Ok(lane.ToLaneDto());
        }

        [HttpPost]
        [Route("{alleyId:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromRoute] int alleyId, [FromBody] CreateLaneRequestDto laneDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(!(await _alleyRepo.AlleyExists(alleyId)))
            {
                return BadRequest("Ta kręgielnia nie istnieje!");
            }
            var lane = laneDto.ToLaneFromCreateLaneRequestDto(alleyId);
            try{
                await _laneRepo.CreateAsync(lane);
                return CreatedAtAction(nameof(GetById), new { id = lane.Id }, lane.ToLaneDto());
            } catch(Exception e){
                return BadRequest(e.Message);
            }
           
            
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLaneRequestDto laneDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var laneModel = await _laneRepo.UpdateAsync(id, laneDto);
                if(laneModel == null){
                    return NotFound();
                }
                return Ok(laneModel.ToLaneDto());
            } 
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var laneModel = await _laneRepo.DeleteAsync(id);
            if(laneModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}