import React from 'react'
import Footer from './Footer'
import Nav from './Nav'

const Layout = (props:any) => {
  return (
    <div className='min-h-screen bg-[#edeceb]'>
        <Nav />
        {props.children}
        <Footer />
    </div>
  )
}

export default Layout