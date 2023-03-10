import React from 'react'
import { Link } from 'react-router-dom'
import LoggedInMenu from './LoggedInMenu'

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





    {props.loggedIn == null &&
    <>
    <Link to='/signup' className='sm:hidden hover:bg-stone-200 hover:text-black w-24 self-center bg-stone-900 p-1 border-stone-200 border-4'>Sign Up</Link>
    <Link to='/signin' className='sm:hidden hover:bg-stone-900 hover:text-stone-200 w-24 self-center bg-stone-200 text-black p-1 border-stone-200 border-4'>Sign In</Link>
    </>}
    {props.loggedIn != null &&
   <div className='sm:hidden flex justify-center items-center'> <LoggedInMenu open={props.openState} mobile={true} firstColor={["bg-stone-200","text-stone-200","#E7E5E4"]} secondColor={["bg-stone-900","text-stone-900","#E7E5E4"]}  /></div>
    }

  </div></div>
  )
}

export default ResponsiveMenu