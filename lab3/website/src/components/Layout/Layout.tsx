import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Account from '../../pages/Account';
import Browse from '../../pages/Browse';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Footer from './Footer'
import Nav from './Nav'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },{
    path: "/browse",
    element: <Browse/>,
  },{
    path: "/account",
    element: <Account/>,
  },{
    path:"*",
    element: <NotFound />
  }
]);
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