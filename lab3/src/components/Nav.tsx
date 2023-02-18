import React, { DetailedHTMLProps, EventHandler, VideoHTMLAttributes } from 'react'

const Nav = () => {
  const homeButtonHandler = (e:any) => {
    e?.preventDefault();
    //router push home
  }
  return (
    <div className='w-screen bg-stone-300  h-24 items-center flex text-zinc-800 font-bold'>
      <video onClick={homeButtonHandler} src={'media/logo.mp4'} autoPlay loop className='hover:cursor-pointer h-24 left-0 video mix-blend-darken'/>
      <div className='flex justify-center h-24 items-center absolute w-screen '>

      <ul id="navLinks" className='flex gap-8 mx-auto'>
        <li>Home</li>
        <li>Categories</li>
        <li>What's new?</li>
        <li>Member's club</li>
      </ul>
      </div>
        <span className='absolute right-0 mx-4 bg-blue-400 rounded-lg border-emerald-400 border-4'>Lög in</span>
    </div>
  )
}

export default Nav