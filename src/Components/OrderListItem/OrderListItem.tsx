import React from 'react'
import { OrderGet } from '../../Models/Order'
import { orderDeleteAPI } from '../../Services/OrderServices'
import { toast } from 'react-toastify'

type Props = {
    order: OrderGet;
    orderNumber: number;
}

const OrderListItem = ({ order, orderNumber }: Props) => {
    const deleteOrder = () => {
        orderDeleteAPI(order.id).then((res) => {
            if (res?.status == 204) {
              toast.success("Menu item deleted!");
            }
        });
    }
    const orderTime = new Date(order.orderTime);
    const currentTime = new Date();
    const timeDiffInMinutes = (currentTime.getTime() - orderTime.getTime()) / (1000 * 60);
    const canCancelOrder = timeDiffInMinutes <= 10;
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-6 max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Order #{orderNumber}</h3>
        
        <div className="text-gray-600 mb-2">
          <span className="font-medium">Total Price:</span> ${order.sumPrice.toFixed(2)}
        </div>
        <div className="text-gray-600 mb-2">
          <span className="font-medium">Order Time:</span> {new Date(order.orderTime).toLocaleString()}
        </div>
    
        <div className="mt-3 border-t border-gray-200 pt-3">
          <h4 className="font-semibold text-lg text-gray-800">Order Items:</h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {order.orderItems.map((item) => (
              <li key={item.menuItemId}>
                <strong>{item.menuItemName}</strong> x {item.quantity} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
    
        {canCancelOrder && (
          <div className="mt-4 flex justify-end">
            <form onSubmit={deleteOrder}>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Cancel Order
              </button>
            </form>
          </div>
        )}
      </div>
    );
}

export default OrderListItem