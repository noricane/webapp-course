/* COPYPASTED FROM WEBSITE CLIENT FEEL FREE TO IGNORE */




import React from 'react'

const Card = (props:any) => {
  return (
    <div className='w-[80vw] h-[42rem] text-center bg-stone-200 rounded-xl mx-auto'>{props.children}</div>
  )
}

export default Card