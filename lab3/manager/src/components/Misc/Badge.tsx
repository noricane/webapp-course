/* COPYPASTED FROM WEBSITE CLIENT FEEL FREE TO IGNORE */







import React from 'react'

const Badge = (props:any) => {
  return (
    <div className={`text-stone-800 h-auto px-1 py-0.5 font-semibold text-sm bg-red-100 w-16 text-center rounded-md`}>{props.info}</div>
  )
}

export default Badge