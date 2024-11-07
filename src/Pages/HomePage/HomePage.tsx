import React from 'react'
import AlleyListItem from '../../Components/AlleyListItem/AlleyListItem'
import Alley from '../../Components/Alley/Alley'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div>
      <h1>HomePage</h1>
      <Alley />
    </div>
    
  )
}

export default HomePage