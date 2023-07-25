import React from 'react';
import { NavLink } from 'react-router-dom';

function CryptoNavbar() {
  return (
    <nav className='border-blue-900 p-2 md:w-[40%] sm:w-[60%] w-[80%] mb-7 flex justify-around mx-auto align-middle border border-cyan rounded-lg'>
        <NavLink to={'/crypto'} end className={({isActive})=>{
            return `rounded-lg capitalize font-semibold p-0 md:p-1 w-full lg:text-lg md:text-base text-sm text-center ${isActive ? 'bg-blue-500 text-white' : ''}`
        }}>Crypto</NavLink>
        <NavLink to={'/trending'} className={({isActive})=>{
            return `rounded-lg capitalize font-semibold p-0 md:p-1 w-full lg:text-lg md:text-base text-sm text-center ${isActive ? 'bg-blue-500 text-white' : ''}`
        }}>Trending</NavLink>
        <NavLink to={'/saved'} className={({isActive})=>{
            return `rounded-lg capitalize font-semibold p-0 md:p-1 w-full lg:text-lg md:text-base text-sm text-center ${isActive ? 'bg-blue-500 text-white' : ''}`
        }}>Saved</NavLink>

    </nav>
  );
}

export default CryptoNavbar;
