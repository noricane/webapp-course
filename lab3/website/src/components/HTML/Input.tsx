import React from 'react'

const Input = ({name,value,onChange,disabled,type='text',width='auto'}:{name:string,value:string|undefined,onChange?:Function,disabled?:boolean,type?:string,width?:string}) => {
    return  <input name={name} type={type} disabled={disabled ? true:false} onChange={(e) => onChange && onChange(e.target.value)} className={`${width} p-2 text-2xl bg-white text-stone-700 h-10 rounded-sm col-span-1 font-oswald`} value={value} />
   
   }

export default Input