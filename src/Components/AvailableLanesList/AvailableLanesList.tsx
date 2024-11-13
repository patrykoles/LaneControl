import React from 'react'
import { LaneGet } from '../../Models/Lane'
import AvailableLanesListItem from '../AvailableLanesListItem/AvailableLanesListItem'
import { CreateReservationFormInputs } from '../../Pages/ReservationForms/CreateReservationPage/CreateReservationPage'

type Props = {
    lanes: LaneGet[],
    formData: CreateReservationFormInputs
}

const AvailableLanesList = ({ lanes, formData }: Props) => {
    return (
        <div>
          {lanes
            ? lanes.map((lane) => {
                return <AvailableLanesListItem lane={lane} formData={formData} />;
              })
            : ""}
        </ div>
      );
}

export default AvailableLanesList