import React, { useEffect, useState } from 'react'
import { AlleyGet } from '../../Models/Alley'
import { alleyGetAllAPI } from '../../Services/AlleyService';
import AlleyList from '../AlleyList/AlleyList';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/UseAuth';

type Props = {}

const Alley = (props: Props) => {
    const [alleys, setAlleys] = useState<AlleyGet[] | null>(null);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const { isAdmin } = useAuth();

    useEffect(() => {
        getAlleys();
      }, []);

    const handleSearch = () => {
        getAlleys();
    };

    const getAlleys = () => {
        alleyGetAllAPI(name, city).then((res) => {
            setAlleys(res?.data!);
        });
    };

  const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  };
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col md:flex-row gap-4">
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
            <input 
                type="text" 
                placeholder="City" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
        </div>
        {alleys ? (
          <>
          <AlleyList alleys={alleys!} />
          {isAdmin ? (
          <div className="flex justify-center mt-4 my-5">
          <Link to={`/addalley`}>
              <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-600">Add New Alley</button>
          </Link>
          </div> 
          ) : ""}
          </>
        ) : ""}
    </div>
  )
}

export default Alley