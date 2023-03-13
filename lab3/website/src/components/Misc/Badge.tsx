import React from 'react'

/* Badge for showing discount percentage */
const Badge = ({info}:{info:string}) => {
  return (
    <div className={`text-stone-800 h-auto px-1 py-0.5 font-semibold text-sm bg-red-100 w-16 text-center rounded-md`}>{info}</div>
  )
}

export default Badge