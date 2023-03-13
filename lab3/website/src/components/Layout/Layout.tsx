import { ReactNode } from 'react'
import Footer from './Footer'
import Nav from './Nav'


/* Structural Component for keepign app layout on page changes, type any is fine here */
const Layout = (props:{children:ReactNode}) => {
  return (
    <div className='min-h-screen bg-[#edeceb]'>
        <Nav />
          {props.children}
        <Footer />
    </div>
  )
}

export default Layout