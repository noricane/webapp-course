import React from 'react'

const RefInput = ({name,type,ref,}:{name:string,type:string,ref:React.RefObject<HTMLInputElement>}) => {
    return <input ref={ref} name={name} type={type} className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />

}

export default RefInput