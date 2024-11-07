import React from 'react'
import { useParams } from 'react-router'

type Props = {}

const UpdateAlleyPage = (props: Props) => {
  let { alleyid } = useParams();
  return (
    <div>
      UpdateAlleyPage
      <p>Alley Id: { alleyid }</p>
    </div>
  )
}

export default UpdateAlleyPage