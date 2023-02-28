import React from 'react'

const ResponsiveMenu = (props:any) => {
  return (
    <div className='md:hidden shadow-lg'><div
    className={`${
      props.openState ? "utsm:h-96 h-56" : "h-0"
    } bg-stone-900 transition-all duration-500 ease-in-out overflow-hidden  text-white  font-inriaserif text-center flex flex-col  justify-around `}
  >
    

    <a rel="noreferrer" href="https://www.louvre.fr/en/visit" target={"_blank"}>Home</a>
    <a rel="noreferrer" href="https://www.louvre.fr/en/explore" target={"_blank"}>Categories</a>
    <a rel="noreferrer" href="https://www.louvre.fr/en/what-s-on" target={"_blank"}>What&apos;s New?</a>
    <a rel="noreferrer" href="https://www.louvre.fr/en/what-s-on" target={"_blank"}>Member&apos;s Club</a>
    <a href='/' className='sm:hidden hover:bg-stone-200 hover:text-black w-24 self-center bg-stone-900 p-1 border-stone-200 border-4'>Sign Up</a>
    <a href='/' className='sm:hidden hover:bg-stone-900 hover:text-stone-200 w-24 self-center bg-stone-200 text-black p-1 border-stone-200 border-4'>Sign In</a>
        

  </div></div>
  )
}

export default ResponsiveMenu