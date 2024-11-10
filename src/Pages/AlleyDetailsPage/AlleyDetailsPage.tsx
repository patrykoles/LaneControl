import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
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
  return (
    <>
      {alley ? (
        <>
          <AlleyDetails alley={alley} />
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