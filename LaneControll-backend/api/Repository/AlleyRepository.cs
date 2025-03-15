using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Alley;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AlleyRepository : IAlleyRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly ILaneRepository _laneRepo;
        public AlleyRepository(ApplicationDBContext context, ILaneRepository laneRepo)
        {
            _context = context;
            _laneRepo = laneRepo;
        }

        public async Task<bool> AlleyExists(int id)
        {
            return await _context.Alleys.AnyAsync(x => x.Id == id);
        }

        public async Task<Alley> CreateAsync(Alley alleyModel)
        {
            await _context.Alleys.AddAsync(alleyModel);
            await _context.SaveChangesAsync();
            return alleyModel;
        }

        public async Task<Alley?> DeleteAsync(int id)
        {
            var alleyModel = await _context.Alleys.FirstOrDefaultAsync(x => x.Id == id);

            if(alleyModel == null)
            {
                return null;
            }

            var lanes = await _context.Lanes.Where(x => x.AlleyId == id).ToListAsync();
            foreach(var lane in lanes)
            {
                await _laneRepo.DeleteAsync(lane.Id);
            }

            _context.Alleys.Remove(alleyModel);
            await _context.SaveChangesAsync();
            return alleyModel;
        }

        public async Task<List<Alley>> GetAllAsync(AlleyQuery query)
        {
            var alleys =  _context.Alleys.AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.Name))
            {
                alleys = alleys.Where(x => x.Name.Contains(query.Name));
            }

            if(!string.IsNullOrWhiteSpace(query.City))
            {
                alleys = alleys.Where(x => x.City.Contains(query.City));
            }

            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    alleys = query.IsDescending ? alleys.OrderByDescending(x => x.Name) : alleys.OrderBy(x => x.Name);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await alleys.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Alley?> GetByIdAsync(int id)
        {
            return await _context.Alleys.FindAsync(id);
        }

        public async Task<Alley?> UpdateAsync(int id, UpdateAlleyRequestDto alleyDto)
        {
            var existingAlley = await _context.Alleys.FirstOrDefaultAsync(x => x.Id == id);

            if(existingAlley == null)
            {
                return null;
            }

            existingAlley.Name = alleyDto.Name;
            existingAlley.City = alleyDto.City;
            existingAlley.Address = alleyDto.Address;
            existingAlley.OpeningTime = alleyDto.OpeningTime;
            existingAlley.ClosingTime = alleyDto.ClosingTime;

            await _context.SaveChangesAsync();

            return existingAlley;
        }
    }
}