import React from 'react'
import { LaneGet } from '../../Models/Lane'
import AvailableLanesListItem from '../AvailableLanesListItem/AvailableLanesListItem'
import { CreateReservationFormInputs } from '../../Pages/ReservationForms/CreateReservationPage/CreateReservationPage'

type Props = {
    lanes: LaneGet[];
    formData: CreateReservationFormInputs;
    handleReservation: (e: React.SyntheticEvent, param1: Date, param2: Date, param3: number) => void;
    reservationId: number | null;
}

const AvailableLanesList = ({ lanes, formData, handleReservation, reservationId }: Props) => {
    return (
        <div>
          {lanes
            ? lanes.map((lane) => {
                return <AvailableLanesListItem lane={lane} formData={formData} handleReservation={handleReservation} reservationId={reservationId}/>;
              })
            : (<p>No lines available during this time</p>)}
        </ div>
      );
}

export default AvailableLanesList