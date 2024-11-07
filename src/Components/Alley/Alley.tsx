import React, { useEffect, useState } from 'react'
import { AlleyGet } from '../../Models/Alley'
import { alleyGetAllAPI } from '../../Services/AlleyService';
import AlleyList from '../AlleyList/AlleyList';

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
        {alleys ? <AlleyList alleys={alleys!} /> : ""}
    </div>
  )
}

export default Alley