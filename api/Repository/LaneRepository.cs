using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Lane;
using api.Exceptions;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class LaneRepository : ILaneRepository
    {
        private readonly ApplicationDBContext _context;
        public LaneRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Lane>> GetAllAsync()
        {
            return await _context.Lanes.ToListAsync();
        }

        public async Task<Lane> CreateAsync(Lane laneModel)
        {
            var lane = await _context.Lanes.FirstOrDefaultAsync(x => x.Number == laneModel.Number && x.AlleyId == laneModel.AlleyId);
            if(lane != null)
            {
                throw new EntityAlreadyExistsException("Tor z tym numerem już istnieje w kręgielni");
            }
            await _context.Lanes.AddAsync(laneModel);
            await _context.SaveChangesAsync();
            return laneModel;
        }

        public async Task<Lane?> GetByIdAsync(int id)
        {
            return await _context.Lanes.FindAsync(id);
        }

        public async Task<Lane?> UpdateAsync(int id, UpdateLaneRequestDto laneDto)
        {
            var existingLane = await _context.Lanes.FindAsync(id);
            if(existingLane == null)
            {
                return null;
            }
            if(existingLane.Number != laneDto.Number)
            {
                var nextLane = await _context.Lanes.FirstOrDefaultAsync(x => x.AlleyId == existingLane.AlleyId && x.Number == laneDto.Number);
                if(nextLane != null)
                {
                    throw new EntityAlreadyExistsException("Tor z tym numerem już istnieje w kręgielni");
                }
            }
            existingLane.Number = laneDto.Number;
            existingLane.Highscore = laneDto.Highscore;
            await _context.SaveChangesAsync();
            return(existingLane);
        }

        public async Task<Lane?> DeleteAsync(int id)
        {
            var laneModel = await _context.Lanes.FindAsync(id);
            if(laneModel == null)
            {
                return null;
            }
            _context.Lanes.Remove(laneModel);
            await _context.SaveChangesAsync();

            return laneModel;
        }
    }
}