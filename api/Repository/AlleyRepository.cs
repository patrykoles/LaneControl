using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Alley;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AlleyRepository : IAlleyRepository
    {
        private readonly ApplicationDBContext _context;
        public AlleyRepository(ApplicationDBContext context)
        {
            _context = context;
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

            _context.Alleys.Remove(alleyModel);
            await _context.SaveChangesAsync();
            return alleyModel;
        }

        public async Task<List<Alley>> GetAllAsync()
        {
            return await _context.Alleys.ToListAsync();
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