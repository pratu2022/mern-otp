import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div>
         <Link to="/login" className='cursor-pointer hover:bg-pink-100'>Login with existing Account?</Link>
    </div>
  )
}

export default Home