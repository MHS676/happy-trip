import React from 'react'
import {Outlet} from "react-router-dom"
import Navbar from '../assets/Pages/Navbar/Navbar'


const Root = () => {
  return (
    <div className='max-w-7xl mx-auto font-poppins mt-6'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Root