import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { reservationGetAPI } from '../../Services/ReservationServices';
import { ReservationGet } from '../../Models/Reservation';
import { OrderGet } from '../../Models/Order';
import { orderGetAllAPI } from '../../Services/OrderServices';
import OrderList from '../../Components/OrderList/OrderList';
import { Link } from 'react-router-dom';

type Props = {}

const ReservationDetailsPage = (props: Props) => {
    const { id } = useParams();
    const [reservation, setReservation] = useState<ReservationGet | null>(null);

    const [orders, setOrders] = useState<OrderGet[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  

const getOrders = () => {
    orderGetAllAPI(Number(id)).then((res) => {
        setOrders(res?.data!);
    });
};

    useEffect(() => {
        getReservation();
    }, []);

    const getReservation = () => {
        reservationGetAPI(Number(id)).then((res) => {
            setReservation(res?.data!);
        });
      };

      const isReservationActive = reservation && new Date(reservation.endTime).getTime() > new Date().getTime();
      const navigate = useNavigate();
      const handleBackClick = () => {
        navigate("/reservations");  // Goes back to the previous page
    };
      return (
        <>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {reservation ? (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">Reservation Details</h2>

                    <div className="mb-4">
                        <h3 className="font-medium text-lg">Alley Information</h3>
                        <p className="text-gray-600">{reservation.alleyName}</p>
                        <p className="text-gray-600">{reservation.alleyCity}</p>
                        <p className="text-gray-600">{reservation.alleyAddress}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-medium text-lg">Lane Information</h3>
                        <p className="text-gray-600">Lane Number: {reservation.laneNumber}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-medium text-lg">Reservation Time</h3>
                        <p className="text-gray-600">Begin Time: {new Date(reservation.beginTime).toLocaleString()}</p>
                        <p className="text-gray-600">End Time: {new Date(reservation.endTime).toLocaleString()}</p>
                    </div>
                </>
            ) : (
                <p className="text-gray-600 text-center">Loading reservation details...</p>
            )}
        </div>
        {isReservationActive && (
        <div className="flex justify-center mt-4 my-5">
          <Link to={`/addorder/${reservation?.id}`}>
              <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-600">Create new order</button>
          </Link>
          </div> 
        )}
        <div className="flex justify-center mt-4 my-5">
        <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
            <span>Back</span>
        </button>
        </div>
        {orders.length > 0 ? (
            <OrderList orders={orders} />
          ) : (
            <div className="flex justify-center mb-6"><p className="text-gray-700 text-lg mb-6 py-6 px-20">No orders with this reservation</p></div>
          )}
        </>
    );
}

export default ReservationDetailsPage