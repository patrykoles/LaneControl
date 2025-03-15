import React, { useEffect, useState } from 'react'
import { boolean } from 'yup'
import { reservationGetAllAPI } from '../../Services/ReservationServices';
import { ReservationGet } from '../../Models/Reservation';
import ReservationList from '../../Components/ReservationList/ReservationList';

type Props = {}

const ReservationsPage = (props: Props) => {
    const [isExpired, setIsExpired] = useState<boolean>(false);
    const [reservations, setReservations] = useState<ReservationGet[]>([]);

    useEffect(() => {
        getReservations();
      }, [isExpired]);

    const getReservations = () => {
        reservationGetAllAPI(isExpired).then((res) => {
            setReservations(res?.data!);
        });
    };
  return (
    <div>
          <p className="text-gray-700 text-lg mb-6 py-6 px-20">
          Explore your bookings! Below, you'll find a list of your current and past reservations. Switch between active and previous bookings to view your reservation history and make plans for your next visit.
            </p>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setIsExpired(false)}
                    className={`px-4 py-2 rounded-md ${!isExpired ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Current Reservations
                </button>
                <button
                    onClick={() => setIsExpired(true)}
                    className={`px-4 py-2 rounded-md ${isExpired ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Old Reservations
                </button>
            </div>
            {reservations ? (
          <>
          <ReservationList reservations={reservations} />
          </>
        ) : (<p className="text-gray-800 text-md mb-3 py-3 px-14">You currently have no reservations. Try creating some on the Home Page</p>)}
        </div>
  )
}

export default ReservationsPage