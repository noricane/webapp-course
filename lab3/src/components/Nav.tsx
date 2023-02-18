import { useState } from 'react'
import {Twirl as Hamburger} from 'hamburger-react'
const Nav = () => {
  const [isOpen, setOpen] = useState(false)
  const homeButtonHandler = (e:any) => {
    e?.preventDefault();
    //router push home
  }
  return (
    <div className='w-screen  bg-stone-200  h-24 items-center flex text-zinc-800 font-bold'>
      <video onClick={homeButtonHandler} src={'media/logo.mp4'} muted playsInline draggable="false" autoPlay loop className='hover:cursor-pointer  h-24 utmd:mx-auto md:left-0 video mix-blend-darken'/>
      <div className='flex justify-center  h-24 items-center absolute w-screen '>
      <div className='left-0 mx-4 md:hidden absolute'><Hamburger toggled={isOpen} toggle={setOpen} /></div>
      <ul id="navLinks" className='flex utmd:hidden gap-8 mx-auto'>
        <li>Home</li>
        <li>Categories</li>
        <li>What's new?</li>
        <li>Member's club</li>
        <div className='xs:hidden'><span className='hover:bg-black hover:text-stone-200  bg-stone-200 p-1 border-black border-4'>Sign in</span>
        <span className='bg-black text-stone-200  hover:bg-stone-200 hover:text-black p-1 border-black border-4'>Sign in</span>
        </div>
      </ul>
      </div>
        <div className='absolute utxs:hidden [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2'>
        <span className='hover:bg-black hover:text-stone-200  bg-stone-200 p-1 border-black border-4'>Sign in</span>
        <span className='bg-black text-stone-200  hover:bg-stone-200 hover:text-black p-1 border-black border-4'>Sign in</span>
        
        </div>
    </div>
  )
}

export default Nav