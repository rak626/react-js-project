import React, { useEffect, useState } from 'react'

function Github() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch('https://api.github.com/users/hiteshchoudhary')
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])
  return (
    <div className='text-center m-4 bg-gray-700 text-white p-4 text-3xl'>
      Github followers :{data.followers}
      <img src={data.avatar_url} alt="user-pic" width={300}/>
    </div>
  )
}

export default Github
