import React from 'react'
import { ReservationAdminGet } from '../../Models/Reservation'
import { reservationAdminDeleteAPI } from '../../Services/ReservationServices';
import { toast } from 'react-toastify';

type Props = {
    reservation: ReservationAdminGet;
}

const AdminReservationListItem = ({reservation}: Props) => {
    const deleteReservation = () => {
        reservationAdminDeleteAPI(reservation.id).then((res) => {
            if (res?.status == 204) {
              toast.success("Alley deleted!");
            }
        });
    }
    return (
        <div className="border border-gray-300 rounded-lg p-6 mb-4 bg-gray-50 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reservation</h3>
            <p><strong>User:</strong> {reservation.reservationUserName}</p>
            <p><strong>From:</strong> {new Date(reservation.beginTime).toLocaleString()}</p>
            <p><strong>To:</strong> {new Date(reservation.endTime).toLocaleString()}</p>           
            <p><strong>Alley:</strong> {reservation.alleyName}</p>
            <p><strong>City:</strong> {reservation.alleyCity}</p>
            <p><strong>Address:</strong> {reservation.alleyAddress}</p>
            <p><strong>Lane number:</strong> {reservation.laneNumber}</p>
            <form onSubmit={deleteReservation}>
            <button
                type='submit' 
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" 
            >
                Delete
            </button>
            </form>
        </div>
    );
}

export default AdminReservationListItem