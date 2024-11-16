import React, { useEffect, useState } from 'react'
import { MenuItemGet } from '../../Models/MenuItem';
import { OrderItemPost, OrderPost } from '../../Models/Order';
import { menuItemGetAllAPI } from '../../Services/MenuItemServices';
import { orderPostAPI } from '../../Services/OrderServices';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {}

const CreateOrderPage = (props: Props) => {
  const { reservationid } = useParams();
  const [menuItems, setMenuItems] = useState<MenuItemGet[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItemPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenuItems();
  }, [])
  const getMenuItems = () => {
    menuItemGetAllAPI().then((res) => {
        setMenuItems(res?.data!);
    });
  };
  const handleQuantityChange = (id: number, price: number, quantity: number) => {
    setOrderItems(prevOrderItems => {
        const updatedOrderItems = prevOrderItems.filter(item => item.menuItemId !== id);
        if (quantity > 0) {
            updatedOrderItems.push({ menuItemId: id, quantity, price });
        }
        return updatedOrderItems;
    });
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    orderPostAPI(Number(reservationid), orderItems)
      .then((res) => {
        if (res) {
          toast.success("Lane created successfully!");
          navigate(`/reservationdetails/${reservationid}`);
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const handleBackClick = () => {
    navigate(`/reservationdetails/${reservationid}`);  // Goes back to the previous page
};
  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Your Order</h2>
      {menuItems.map(item => (
        <div key={item.id} className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            {item.name} - <span className="text-gray-500">{item.category}</span> - {item.currentPrice} PLN
          </label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Quantity"
            onChange={(e) => handleQuantityChange(item.id, item.currentPrice, parseInt(e.target.value))}
          />
        </div>
      ))}
      <div className="text-right mt-6">
        <strong className="text-lg">Total: {calculateTotal().toFixed(2)} PLN</strong>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Place Order
      </button>
    </form>
    <div className="flex justify-center mt-4 my-5">
        <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
            <span>Cancel</span>
        </button>
        </div>
    </>
  );
}

export default CreateOrderPage