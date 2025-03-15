import React from 'react'
import { LaneGet } from '../../Models/Lane'
import { Link } from 'react-router-dom';
import { laneDeleteAPI } from '../../Services/LaneServices';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/UseAuth';

type Props = {
    lane: LaneGet;
}

const LaneListItem = ({ lane }: Props) => {
  const {isAdmin} = useAuth();
    const deleteLane = () => {
        laneDeleteAPI(lane.id).then((res) => {
            if (res?.status == 204) {
              toast.success("Lane deleted!");
            }
        });
    }
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col space-y-4 my-4 border-2 border-gray-200">
  <div className="flex justify-between items-center">
    <h3 className="text-2xl font-semibold text-gray-800">{`Lane #${lane.number}`}</h3>
    {isAdmin ? (
    <div className="flex space-x-2">
        <Link to={`/updatelane/${lane.alleyId}/${lane.id}`}>
      <button 
      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 text-sm">
        Edit
      </button>
      </Link>
      <form onSubmit={deleteLane}>
      <button 
      type="submit" className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 text-sm">
        Delete
      </button>
      </form>
    </div>
    ) : ""}
  </div>
  
  <p className="text-gray-700">
    <strong className="font-medium text-gray-800">Record: </strong>
    {lane.highscore}
  </p>
</div>

  )
}

export default LaneListItem