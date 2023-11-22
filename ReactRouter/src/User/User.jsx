import React from 'react'
import { useParams } from 'react-router-dom'
function User() {
    const {userId} = useParams()
  return (
    <div className='text-green-700 text-center bg-gray-300 w-60 m-auto h-11 py-3.5'>User : {userId}</div>
  )
}

export default User