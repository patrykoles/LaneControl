import React from 'react'
import { AlleyGet } from '../../Models/Alley'
import AlleyListItem from '../AlleyListItem/AlleyListItem';

type Props = {
    alleys: AlleyGet[];
}

const AlleyList = ({ alleys }: Props) => {
  return (
    <>
      {alleys
        ? alleys.map((alley) => {
            return <AlleyListItem alley={alley} />;
          })
        : ""}
    </>
  );
};

export default AlleyList