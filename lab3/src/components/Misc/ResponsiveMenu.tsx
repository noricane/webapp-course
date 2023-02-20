import React from 'react'

const ResponsiveMenu = (props:any) => {
  return (
    <div className='md:hidden shadow-lg'><div
    className={`${
      props.openState ? "utsm:h-72 h-48" : "h-0"
    } bg-stone-700 transition-all duration-500 ease-in-out overflow-hidden  text-white  font-inriaserif text-center flex flex-col  justify-around `}
  >
    

    <a rel="noreferrer" href="https://www.louvre.fr/en/visit" target={"_blank"}>VISIT</a>
    <a rel="noreferrer" href="https://www.louvre.fr/en/explore" target={"_blank"}>EXPLORE</a>
    <a rel="noreferrer" href="https://www.louvre.fr/en/what-s-on" target={"_blank"}>WHAT&apos;S ON</a>
    <a href='/' className='sm:hidden hover:bg-stone-200 hover:text-black w-24 self-center bg-stone-700 p-1 border-stone-200 border-4'>Sign Up</a>
    <a href='/' className='sm:hidden hover:bg-stone-700 hover:text-stone-200 w-24 self-center bg-stone-200 text-black p-1 border-stone-200 border-4'>Sign In</a>
        

  </div></div>
  )
}

export default ResponsiveMenu