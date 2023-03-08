import React from 'react'
import { Link } from 'react-router-dom'

const ResponsiveMenu = (props:any) => {
  return (
    <div className='md:hidden shadow-lg'><div
    className={`${
      props.openState ? "utsm:h-96 h-56" : "h-0"
    } bg-stone-900 transition-all duration-500 ease-in-out overflow-hidden  text-white  font-inriaserif text-center flex flex-col  justify-around `}
  >
    

    
    <Link to={"/"}>Home</Link> 
            <Link to={"/browse"}>Browse</Link> 
            <Link to={"/news"}>What's New?</Link> 
            <Link to={"/membersclub"}>Member's Club</Link> 





    <Link to='/signup' className='sm:hidden hover:bg-stone-200 hover:text-black w-24 self-center bg-stone-900 p-1 border-stone-200 border-4'>Sign Up</Link>
    <Link to='/signin' className='sm:hidden hover:bg-stone-900 hover:text-stone-200 w-24 self-center bg-stone-200 text-black p-1 border-stone-200 border-4'>Sign In</Link>
        

  </div></div>
  )
}

export default ResponsiveMenu