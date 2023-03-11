import React, { ReactNode } from 'react'

const Article = ({title,image,children}:{title:string,image:string,children:ReactNode}) => {
  return (
    <article onClick={()=>alert("You've met a dead end (Not Implemented functionality)")} className='grid grid-cols-9 grid-rows-3 h-40 w-auto gap-1 bg-stone-800 rounded-md p-2 '>
        <div className='row-span-3 col-span-2 rounded-md bg-white flex justify items-center'>
        <img className='' src={image} alt="" />
        </div>
        <h1 className='row-span-1 col-span-7 col-start-3 font-semibold self-center font-oswald text-xl overflow-hidden whitespace-nowrap text-ellipsis'>{title}</h1>
        <section className='row-span-2 col-span-6  articleContent'>
        {children}
        </section>    
    </article>
  )
}

export default Article