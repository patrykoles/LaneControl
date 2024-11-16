import React from 'react'
import { AlleyGet } from '../../Models/Alley'
import { Link } from 'react-router-dom';
import { alleyDeleteAPI } from '../../Services/AlleyService';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/UseAuth';

type Props = {
    alley: AlleyGet;
}

const AlleyListItem = ({ alley }: Props) => {
    const {isAdmin} = useAuth();
    const deleteAlley = () => {
        alleyDeleteAPI(alley.id).then((res) => {
            if (res?.status == 204) {
              toast.success("Alley deleted!");
            }
        });
    }
  return (
    <div className="max-w-sm mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden my-8">
    <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{alley.name}</h2>

        <p className="text-gray-600"><strong>City: </strong>{ alley.city }</p>
        <p className="text-gray-600"><strong>Address: </strong>{ alley.address }</p>

        <div className="mt-4">
            <p className="text-gray-600"><strong>Operating hours: </strong> { alley.openingTime.slice(0, 5) } - { alley.closingTime.slice(0, 5) }</p>
        </div>

        
            {isAdmin ? (
            <>
            <div className="mt-6 flex space-x-4">
            <Link to={`/updatealley/${alley.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit</button>
            </Link>
            <form onSubmit={deleteAlley}>
            <button type='submit' className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
            </form>
            <Link to={`/alleydetails/${alley.id}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Browse</button>
            </Link>
            </div>
            </>
            ) : (
                <>
                    <div className="flex justify-center">
                    <Link to={`/alleydetails/${alley.id}`}>
                        <button className="bg-green-500 text-white px-4 py-1 my-2 rounded-md hover:bg-green-600">Browse</button>
                    </Link>
                    </div>
                </>
            )}
            
        
    </div>
</div>

  )
}

export default AlleyListItem