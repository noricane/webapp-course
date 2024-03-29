import React, { useState } from 'react'


/* Shoe size list component for selecting shoes */
const SizeList = ({items,useSize}:{items:{size:number,amount:number}[],useSize:[ ({size: number;amount: number;} | undefined),Function]}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [size, setSize] = useSize;
  return (
    <div className='select-none	my-4'>
    <div className='h-12 w-36 bg-stone-50 p-1 flex justify-center items-center cursor-pointer font-bold rounded-sm relative z-10 hover:bg-stone-200 active:bg-stone-300 transition-all shadow-md' onClick={()=>setIsOpen(prev=>!prev)}>{size == null ? 'Select a Size ➤' : size.size}  </div>
    
    <div className={`${isOpen ?  'max-h-48 min-h-24 w-56 ' : 'h-0  w-36 opacity-0 cursor-default -z-10'} absolute py-3 px-2 flex flex-col gap-3 font-bold scrollbar-hide overflow-y-scroll overflow-x-hidden rounded-sm transition-all bg-stone-50 `}>
        {items.map(e => <button onClick={evt =>{  size == e ? setSize(undefined) : isOpen && e.amount > 0 &&setSize(e); setIsOpen(false);}} className={`${e.amount == 0 && 'text-stone-400'} ${!isOpen && 'cursor-default '} hover:bg-stone-300 px-2 transition-all rounded-sm flex justify-between`}>{e.size}{e != null && e.amount < 10 && e.amount != 0 ? <span className='text-red-500 font-bold'>Few pairs left</span> : ''}</button>)}  
    </div>
    {/*  */}
    </div>
  )
}

export default SizeList