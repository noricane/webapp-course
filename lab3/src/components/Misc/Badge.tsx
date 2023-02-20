import React from 'react'

const Badge = (props:any) => {
  return (
    <div className='text-stone-700 text-sm bg-red-300 w-16 text-center rounded-md'>{props.info}</div>
  )
}

export default Badge