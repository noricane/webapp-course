import React, { useEffect, useState } from 'react'

const ProductImages = ({images}:{images:string[]}) => {
    const [selected, setSelected] = useState<string>()
    useEffect(()=>{
        images.length > 0 && setSelected(images[0])
    },[])

    if(images.length == 0 ){
        return <div>No images found</div>
    }
    


  return (
    <>
        <div className=' shadow-lg '>
            <img src={selected} className=" sm:h-[50vw] rounded-t-xl" alt="" />
        </div>
        <div className='h-[1px] bg-stone-300'></div>
        <div className='flex shadow-lg   md:h-[10vw] h-24 overflow-scroll bg-stone-300 rounded-b-xl'>
        {images.map(e => <img onClick={()=> setSelected(e)} className="hover:brightness-95 active:brightness-75 transition-transforms cursor-pointer duration-200 hover:bg-blend-hue" src={e} alt="" />)}
        </div>
    </>
  )
}

export default ProductImages