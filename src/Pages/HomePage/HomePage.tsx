import React from 'react'
import AlleyListItem from '../../Components/AlleyListItem/AlleyListItem'
import Alley from '../../Components/Alley/Alley'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <p className="text-gray-700 text-lg mb-6 py-6 px-20">
          Here, you can search for bowling alleys near you and make reservations with ease. Browse available locations,
          check their operating hours, and book a lane for your next game!
        </p>
      <Alley />
    </div>
    
  )
}

export default HomePage