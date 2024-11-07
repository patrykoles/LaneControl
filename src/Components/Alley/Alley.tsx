import React, { useEffect, useState } from 'react'
import { AlleyGet } from '../../Models/Alley'
import { alleyGetAllAPI } from '../../Services/AlleyService';
import AlleyList from '../AlleyList/AlleyList';
import { Link } from 'react-router-dom';

type Props = {}

const Alley = (props: Props) => {
    const [alleys, setAlleys] = useState<AlleyGet[] | null>(null);

    useEffect(() => {
        getAlleys();
      }, []);

    const getAlleys = () => {
        alleyGetAllAPI().then((res) => {
            setAlleys(res?.data!);
        });
    };
  return (
    <div className="flex flex-col">
        {alleys ? (
          <>
          <AlleyList alleys={alleys!} />
          <div className="flex justify-center mt-4 my-5">
          <Link to={`/addalley`}>
              <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-600">Add New Alley</button>
          </Link>
          </div> 
          </>
        ) : ""}
    </div>
  )
}

export default Alley