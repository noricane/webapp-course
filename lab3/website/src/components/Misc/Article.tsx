import React, { ReactNode } from 'react'


/* Simple article component displayed in /news page*/
const Article = ({title,image,children}:{title:string,image:string,children:ReactNode}) => {
  return (
    <article onClick={()=>alert("You've met a dead end (Not Implemented functionality)")} className='cursor-pointer hover:bg-stone-700  grid grid-cols-9 grid-rows-3 h-40 w-auto gap-1 bg-stone-800 border-[1px] border-stone-600 rounded-md p-2 '>
        <div className='row-span-3 col-span-2 utxs:row-span-2 utxs:col-span-3 rounded-md bg-white flex justify-center items-center'>
        <img className='max-h-full' src={image} alt="" />
        </div>
        <h1 className='row-span-1 col-span-7 col-start-3 utxs:row-span-2 utxs:col-span-6  font-semibold self-center font-oswald text-xl overflow-hidden sm:whitespace-nowrap text-ellipsis'>{title}</h1>
        <section className='row-span-2 col-span-6 utxs:row-span-1 utxs:col-span-full articleContent'>
        {children}
        </section>    
    </article>
  )
}

export default Article