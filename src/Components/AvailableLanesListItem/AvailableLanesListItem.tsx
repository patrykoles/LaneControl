import React from 'react'
import { LaneGet } from '../../Models/Lane'
import { CreateReservationFormInputs, toISOStringWithoutTimezone } from '../../Pages/ReservationForms/CreateReservationPage/CreateReservationPage'
import { Link, useNavigate } from 'react-router-dom'
import { reservationPostAPI } from '../../Services/ReservationServices'
import { toast } from 'react-toastify'

type Props = {
    lane: LaneGet;
    formData: CreateReservationFormInputs;
    handleReservation: (e: React.SyntheticEvent, param1: Date, param2: Date, param3: number) => void;
    reservationId: number | null;
}

const AvailableLanesListItem = ({ lane, formData, handleReservation, reservationId}: Props) => {
    const navigate = useNavigate();
    const beginTime = new Date(formData.beginTime);
    const endTime = new Date(formData.endTime);
    
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col space-y-4 my-4 border-2 border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">{`Lane #${lane.number}`}</h3>
        <div className="flex space-x-2">
          <form onSubmit={(e) => handleReservation(e ,beginTime, endTime, reservationId ?? lane.id)}>
          <button 
          type="submit" className="bg-green-400 text-white border-2 px-4 py-1 rounded-md hover:bg-green-500 text-sm">
            Make reservation on this lane
          </button>
          </form>
        </div>
      </div>
      
      <p className="text-gray-700">
        <strong className="font-medium text-gray-800">Record: </strong>
        {lane.highscore}
      </p>
    </div>
    
      )
}

export default AvailableLanesListItem