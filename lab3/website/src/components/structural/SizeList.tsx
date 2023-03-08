import React, { useState } from 'react'

const SizeList = ({items}:{items:{size:number,amount:number}[]}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [size, setSize] = useState<{size:number,amount:number}>()
  return (
    <div className='select-none	my-4'>
    <div className='h-12 w-36 bg-stone-50 p-1 flex justify-center items-center cursor-pointer font-bold rounded-md hover:bg-stone-200 active:bg-stone-300 transition-all' onClick={()=>setIsOpen(prev=>!prev)}>{size == null ? 'Select a Size ➤' : size.size}  </div>
    
    <div className={`${isOpen ?  'h-48 w-56' : 'h-0 w-36 opacity-0'} absolute py-3 px-2 flex flex-col gap-3 font-bold scrollbar-hide overflow-y-scroll overflow-x-hidden rounded-md transition-all bg-stone-50 `}>
        {items.map(e => <button className={`${e.amount == 0 && 'text-stone-400'} hover:bg-stone-300 px-2 transition-all rounded-md flex justify-between`}>{e.size}{e != null && e.amount < 10 && e.amount != 0 ? <span className='text-red-500 font-bold'>Few pairs left</span> : ''}</button>)}
       
    </div>
    {/*  */}
    </div>
  )
}

export default SizeList