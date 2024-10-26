using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Lane;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ILaneRepository
    {
        Task<List<Lane>> GetAllAsync(LaneQuery query);

        Task<Lane> CreateAsync(Lane laneModel);

        Task<Lane?> GetByIdAsync(int id);

        Task<Lane?> UpdateAsync(int id, UpdateLaneRequestDto laneDto);

        Task<Lane?> DeleteAsync(int id);
    }
}