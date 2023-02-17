import React from 'react'

const Nav = () => {
  return (
    <div className='w-screen bg-stone-300 h-24 flex text-green-900 font-bold'>
      <div className='font-3xl'>logo</div>
      <div className='flex'>

      <ul id="navLinks" className='flex'>
        <li>Home</li>
        <li>Categories</li>
        <li>What's new?</li>
        <li>Member's club</li>
        <li className='mx-4 bg-blue-400 rounded-lg border-emerald-400 border-4'>Lög in</li>
      </ul>
      </div>
    </div>
  )
}

export default Nav