import React from 'react'
import { ReservationGet } from '../../Models/Reservation'
import ReservationListItem from '../ReservationListItem/ReservationListItem'

type Props = {
    reservations: ReservationGet[]
}

const ReservationList = ({ reservations }: Props) => {
    return (
        <div>
          {reservations
            ? reservations.map((reservation) => {
                return <ReservationListItem reservation={reservation} />;
              })
            : ""}
        </ div>
      );
}

export default ReservationList