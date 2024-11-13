import React from 'react'
import { ReservationGet } from '../../Models/Reservation'

type Props = {
    reservation: ReservationGet
}

const ReservationListItem = ({ reservation }: Props) => {
    const currentDate = new Date();
    const reservationBeginTime = new Date(reservation.beginTime);
    const isPastReservation = reservationBeginTime > currentDate;

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col space-y-4 my-4 border-2 border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Lane #{reservation.laneNumber} at {reservation.alleyName}
            </h3>
            <div className="flex space-x-2">
              {/* Placeholder buttons */}
              {isPastReservation && (
            <>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm">
                Delete
              </button>
            </>
            )}
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm">
                View Details
              </button>
            </div>
          </div>
    
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Location: </strong>
            {reservation.alleyCity}, {reservation.alleyAddress}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-800">Reservation Time: </strong>
            {new Date(reservation.beginTime).toLocaleString()} - {new Date(reservation.endTime).toLocaleString()}
          </p>
        </div>
      )
}

export default ReservationListItem