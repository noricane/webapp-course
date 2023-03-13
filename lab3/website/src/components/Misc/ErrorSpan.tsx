import React from 'react'

/* Simple reusable error component */
const ErrorSpan = (props:{message:string}) => {
  return (
    <span className="text-red-500 font-bold w-full text-center">{props.message}</span>
  )
}

export default ErrorSpan