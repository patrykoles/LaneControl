import React from 'react'
import { ReservationAdminGet } from '../../Models/Reservation'
import AdminReservationListItem from '../AdminReservationListItem/AdminReservationListItem';

type Props = {
    reservations: ReservationAdminGet[];
}

const AdminReservationList = ({reservations}: Props) => {
    return (
        <div className="max-w-lg sm:max-w-2xl md:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {reservations
            ? reservations.map((reservation) => {
                return <AdminReservationListItem reservation={reservation} />;
              })
            : ""}
        </ div>
      );
}

export default AdminReservationList