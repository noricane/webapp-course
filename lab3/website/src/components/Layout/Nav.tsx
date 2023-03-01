import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {Twirl as Hamburger} from 'hamburger-react'
import ResponsiveMenu from '../Misc/ResponsiveMenu'

const Nav = () => {
  const [isOpen, setOpen] = useState(false)
 
  
  const homeButtonHandler = (e:any) => {
    e?.preventDefault();
    //router push home
  }
  return (
    <nav>
      <div className='w-full h-8 bg-stone-800 flex items-center justify-center font-semibold text-stone-200'>
        Free Shipping for Members
      </div>
      <div className='w-screen  bg-stone-200 shadow-md  h-24 items-center flex text-zinc-800 font-bold'>
      <video onClick={homeButtonHandler}  muted playsInline draggable="false" autoPlay loop className='hover:cursor-pointer  h-24 utmd:mx-auto md:left-0 video mix-blend-darken'>
        <source  src={'media/logohb.mp4'}  type="video/mp4" />
      <p>Aesthetic video loop of logo</p>
      </video>
      <div className='flex justify-center  h-24 items-center absolute w-screen '>
      <div className='left-0 mx-4 md:hidden absolute'><Hamburger toggled={isOpen} toggle={setOpen} /></div>
      <ul id="navLinks" className='flex utmd:hidden gap-7  relative z-10 mx-auto'>
      <Router>

        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/browse'}>Browse</Link></li>
        <li><Link to={'/news'}>What's New?</Link></li>
      <li><Link to={'/membersclub'}>Member's Club</Link></li>
      </Router>
       
        
      </ul>
      
      </div>
        <div className='absolute utsm:hidden [&>*]:hover:cursor-pointer right-0 mx-4 flex gap-2'>
        <a href='/' className='hover:bg-black hover:text-stone-200  bg-stone-200 p-1 border-black border-4'>Sign Up</a>
        <a href='/' className='bg-black text-stone-200  hover:bg-stone-200 hover:text-black p-1 border-black border-4'>Sign In</a>
        
        </div>
        
    </div>
    

    <ResponsiveMenu openState={isOpen} setOpenState={setOpen} />

    </nav>
  )
}

export default Nav