import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const links = (
    <div className='flex gap-5'>
      <li>Dashboard</li>
      <li>Master Price</li>
      <li>Custom Price</li>
      <li>Calender</li>
      <li>Reports</li>
    </div>
  );


  

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact Us</NavLink></li>
      <li><NavLink to="/profile">Update Profile</NavLink></li>
      <li><NavLink to="/bookingDetails">Booking Details</NavLink></li>
      </ul>
    </div>
        <div className='flex items-center '>
          <p className='text-xl font-bold text-blue-600'>Happy <span className='text-green-600'>Trip</span></p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      
    </div>
  );
}

export default Navbar;
