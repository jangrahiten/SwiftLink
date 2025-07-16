import axios from 'axios';
import React from 'react'

export const Navbar = ({onclick, isAuthenticated, handleLogout}) => {
  
  return (
    <div className='text-white relative w-full flex justify-end overflow-hidden px-4 py-4'>
      {isAuthenticated?(
        <button onClick={handleLogout} className='bg-gradient-to-r relative z-10 cursor-pointer from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 px-4 py-2 rounded-2xl text-xl font-bold'>Log Out</button>
      ):(
        <button onClick={onclick} className='bg-gradient-to-r relative z-10 cursor-pointer from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 px-4 py-2 rounded-2xl text-xl font-bold'>Sign In</button>
      )}
        
    </div>
  )
}
