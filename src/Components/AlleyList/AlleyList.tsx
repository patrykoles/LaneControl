import React from 'react'
import { AlleyGet } from '../../Models/Alley'
import AlleyListItem from '../AlleyListItem/AlleyListItem';

type Props = {
    alleys: AlleyGet[];
}

const AlleyList = ({ alleys }: Props) => {
  return (
    <div className="max-w-lg sm:max-w-2xl md:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {alleys
        ? alleys.map((alley) => {
            return <AlleyListItem alley={alley} />;
          })
        : ""}
    </ div>
  );
};

export default AlleyList