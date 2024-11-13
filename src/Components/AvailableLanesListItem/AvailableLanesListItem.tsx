import React from 'react'
import { LaneGet } from '../../Models/Lane'
import { CreateReservationFormInputs } from '../../Pages/ReservationForms/CreateReservationPage/CreateReservationPage'
import { Link, useNavigate } from 'react-router-dom'
import { reservationPostAPI } from '../../Services/ReservationServices'
import { toast } from 'react-toastify'

type Props = {
    lane: LaneGet,
    formData: CreateReservationFormInputs
}

const AvailableLanesListItem = ({ lane, formData}: Props) => {
    const navigate = useNavigate();
    const beginTime = new Date(formData.beginTime);
    const endTime = new Date(formData.endTime);
    const handleReservation = (e: React.FormEvent) => {
        e.preventDefault();
        reservationPostAPI(lane.id, beginTime.toISOString(), endTime.toISOString())
          .then((res) => {
            if (res) {
              toast.success("Reservation created successfully!");
              navigate(`/home`);
            }
          })
          .catch((e) => {
            toast.warning(e);
          });
        };
    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col space-y-4 my-4 border-2 border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">{`Lane #${lane.number}`}</h3>
        <div className="flex space-x-2">
          <form onSubmit={handleReservation}>
          <button 
          type="submit" className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm">
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