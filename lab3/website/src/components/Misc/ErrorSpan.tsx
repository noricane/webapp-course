import React from 'react'

const ErrorSpan = (props:{message:string}) => {
  return (
    <span className="text-red-500 font-bold w-full text-center">{props.message}</span>
  )
}

export default ErrorSpan