using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;

namespace api.Repository
{
    public class LaneRepository : ILaneRepository
    {
        private readonly ApplicationDBContext _context;
        public LaneRepository(ApplicationDBContext context)
        {
            _context = context;
        }
    }
}