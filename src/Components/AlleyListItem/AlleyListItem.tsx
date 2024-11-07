import React from 'react'
import { AlleyGet } from '../../Models/Alley'

type Props = {
    alley: AlleyGet;
}

const AlleyListItem = ({ alley }: Props) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{alley.name}</h2>

        <p className="text-gray-600"><strong>Miasto:</strong>{ alley.city }</p>
        <p className="text-gray-600"><strong>Adres:</strong>{ alley.address }</p>

        <div className="mt-4">
            <p className="text-gray-600"><strong>Godziny otwarcia:</strong> { alley.openingTime } - { alley.closingTime }</p>
        </div>

        <div className="mt-6 flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edytuj</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Usuń</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Zobacz</button>
        </div>
    </div>
</div>

  )
}

export default AlleyListItem