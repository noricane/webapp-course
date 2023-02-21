import React from 'react'
import Nav from './Nav'
import Grid from './structural/Grid'
const Layout = (props:any) => {
  return (
    <div className='min-h-screen bg-[#edeceb]'>
        <Nav />
        {props.children}
    </div>
  )
}

export default Layout