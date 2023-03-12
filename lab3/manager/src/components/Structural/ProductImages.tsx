import React, { useEffect, useState } from 'react'
import { TiDeleteOutline } from "react-icons/ti";

const ProductImages = ({images,setImages}:{images:string[],setImages?:Function}) => {
    const [selected, setSelected] = useState<string>()
    const [deleteVisible, setDeleteVisible] = useState<boolean>(false)

    useEffect(()=>{
        images.length > 0 && setSelected(images[0])
    },[images])

    if(images.length == 0 ){
        return (
            <>
            <div onMouseEnter={()=>setDeleteVisible(true)} onMouseLeave={()=>setDeleteVisible(false)} className='font-bold text-lg sm:h-[50vw]  shadow-lg bg-white flex items-center  rounded-t-xl overflow-hidden justify-center'>
            No Images Added yet.

        </div>
        <div className='h-[1px] bg-stone-300'></div>
        <div className='flex shadow-lg   md:h-[10vw] h-24 overflow-scroll bg-stone-300 rounded-b-xl'>

        </div>
        </>
        )
    }
    


  return (
    <>
        <div onClick={()=>setImages && setImages((prev:string[]) => prev.filter(e => e != selected))} onMouseEnter={()=>setDeleteVisible(true)} onMouseLeave={()=>setDeleteVisible(false)} className='cursor-pointer shadow-lg bg-white flex items-center  rounded-t-xl overflow-hidden justify-center'>
            <TiDeleteOutline className={`${deleteVisible ? 'opacity-50' : 'opacity-0'} transition-all text-red-500 absolute`}   id='delete' size={150} />
            <img src={selected}  className=" sm:h-[50vw] object-contain " alt="" />
        </div>
        <div className='h-[1px] bg-stone-300'></div>
        <div className='flex shadow-lg   md:h-[10vw] h-24 overflow-scroll bg-stone-300 rounded-b-xl'>
        {images.map(e => <img onClick={()=> setSelected(e)} className="hover:brightness-95 w-24 object-cover active:brightness-75 transition-transforms cursor-pointer duration-200 hover:bg-blend-hue" src={e} alt="" />)}
        </div>
    </>
  )
}

export default ProductImages