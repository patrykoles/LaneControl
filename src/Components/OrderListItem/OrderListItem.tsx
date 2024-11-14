import React from 'react'
import { OrderGet } from '../../Models/Order'
import { orderDeleteAPI } from '../../Services/OrderServices'
import { toast } from 'react-toastify'

type Props = {
    order: OrderGet
}

const OrderListItem = ({ order }: Props) => {
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
        <div className="p-4 bg-white rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
    
          <div className="text-gray-600 mb-2">
            <strong>Total Price:</strong> ${order.sumPrice.toFixed(2)}
          </div>
          <div className="text-gray-600 mb-2">
            <strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}
          </div>
          <div className="text-gray-600 mb-2">
            <strong>Reservation ID:</strong> {order.reservationId}
          </div>
    
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Order Items:</h4>
            <ul className="list-disc pl-5">
              {order.orderItems.map((item) => (
                <li key={item.menuItemId} className="text-gray-700">
                  <strong>{item.menuItemName}</strong> x {item.quantity} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          {canCancelOrder && (
          <div className="mt-4 flex justify-end">
            <form onSubmit={deleteOrder}>
                <button type='submit' className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                Cancel Order
                </button>
            </form>
            </div>
            )}
        </div>
          
      );
}

export default OrderListItem