import React from 'react'

const TextArea = ({name,value,onChange}:{name:string,value:string|undefined,onChange:Function,}) => {
    return (
    <textarea name={name} rows={3}  className='px-2 py-1 text-2xl w-full text-stone-700 resize-none rounded-sm font-oswald' value={value}  onChange={e=>onChange(e.target.value)}/>
    )
  }

export default TextArea