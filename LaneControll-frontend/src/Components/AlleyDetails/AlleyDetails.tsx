import React from 'react'
import { AlleyGet } from '../../Models/Alley'

type Props = {
    alley: AlleyGet
}

const AlleyDetails = ({ alley }: Props) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg">
    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{alley?.name}</h2>

    <p className="text-gray-700 text-lg mb-2">
        <strong className="font-medium text-gray-800">City: </strong>
        {alley?.city}
    </p>
    
    <p className="text-gray-700 text-lg mb-4">
        <strong className="font-medium text-gray-800">Address: </strong>
        {alley?.address}
    </p>

    <div className="mt-4">
        <p className="text-gray-700 text-lg">
            <strong className="font-medium text-gray-800">Operating Hours: </strong>
            {alley?.openingTime.slice(0, 5)} - {alley?.closingTime.slice(0, 5)}
        </p>
    </div>
    </div>
  )
}

export default AlleyDetails