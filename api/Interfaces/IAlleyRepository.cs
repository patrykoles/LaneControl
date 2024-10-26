using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Alley;
using api.Models;

namespace api.Interfaces
{
    public interface IAlleyRepository
    {
        Task<List<Alley>> GetAllAsync();

        Task<Alley?> GetByIdAsync(int id);

        Task<Alley> CreateAsync(Alley alleyModel);

        Task<Alley?> UpdateAsync(int id, UpdateAlleyRequestDto alleyDto);

        Task<Alley?> DeleteAsync(int id);

        Task<bool> AlleyExists(int id);
    }
}