using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<Order?> GetByIdAsync(int id);

        Task<List<Order>> GetUserOrdersAsync(AppUser user, OrderQuery query);

        Task<Order> CreateAsync(Order order);

        Task<Order?> UpdateSumAsync(int orderId, List<OrderItem> orderItems);

        Task<Order?> DeleteAsync(int id);

        bool CheckIfOrderHasBeenDelivered(Order order);
    }
}