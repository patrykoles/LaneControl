import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { alleyGetAPI } from '../../Services/AlleyService';
import { AlleyGet } from '../../Models/Alley';
import AlleyDetails from '../../Components/AlleyDetails/AlleyDetails';
import { LaneGet } from '../../Models/Lane';
import { laneGetAllAPI } from '../../Services/LaneServices';
import LaneList from '../../Components/LaneList/LaneList';

type Props = {}

const AlleyDetailsPage = (props: Props) => {
    let { alleyid } = useParams();

  const [alley, setAlley] = useState<AlleyGet | null>(null);
  const [lanes, setLanes] = useState<LaneGet[] | null>(null);

  useEffect(() => {
      getAlley();
  }, []);

  useEffect(() => {
    getLanes();
  }, [alley]);

  

const getLanes = () => {
    laneGetAllAPI(Number(alley?.id)).then((res) => {
        setLanes(res?.data!);
    });
};

  const getAlley = () => {
    alleyGetAPI(Number(alleyid)).then((res) => {
        setAlley(res?.data!);
    });
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(`/home`); 
  };

  return (
    <>
      {alley ? (
        <>
          <AlleyDetails alley={alley} />
          <div className="flex justify-center mt-4 my-5">
          <Link to={`/addreservation/${alley.id}`} >
          <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">
            Make Reservation
          </button>
          </Link>
        <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 mx-3"
        >
            <span>Back</span>
        </button>
          </div>
          {lanes ? (
            <LaneList lanes={lanes} />
          ) : (
            <p>No lanes here</p>
          )}
          <div className="flex justify-center mt-4 my-5">
          <Link to={`/addlane/${alley.id}`}>
              <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-600">Add New Lane</button>
          </Link>
          </div> 
        </>
      ) : (
        <p className="flex flex-col items-center text-center">This alley does not exist!</p>
      )}
    </>
  );
}

export default AlleyDetailsPage