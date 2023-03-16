import React from 'react'

/* Page to display if path doesn't match router */
const NotFound = () => {
  return (
    <div className='min-h-[70vh] font-oswald flex justify-center items-center text-4xl'>404 <span className='h-16 w-0.5 mx-2 rounded-md bg-stone-300'/> Not Found</div>
  )
}

export default NotFound