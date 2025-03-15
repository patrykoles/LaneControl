import React from 'react'
import { LaneGet } from '../../Models/Lane'
import LaneListItem from '../LaneListItem/LaneListItem';

type Props = {
    lanes: LaneGet[];
}

const LaneList = ({ lanes }: Props) => {
    return (
        <div>
          {lanes
            ? lanes.map((lane) => {
                return <LaneListItem lane={lane} />;
              })
            : ""}
        </ div>
      );
}

export default LaneList