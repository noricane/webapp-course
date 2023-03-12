import React from 'react'

const Input = ({name,value,onChange,disabled}:{name:string,value:string|undefined,onChange?:Function,disabled?:boolean}) => {
    return  <input name={name} disabled={disabled ? true:false} onChange={(e) => onChange && onChange(e.target.value)} className=' p-2 text-2xl bg-white text-stone-700 h-10 rounded-sm col-span-1 font-oswald' value={value} />
   
   }

export default Input