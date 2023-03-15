import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

import Price from '../components/Misc/Price'
import { orderAtom, sessionAtom } from '../model/jotai.config'
import { multiProduct } from '../model/types'

const Success = () => {

  
  const [session,setSession] = useAtom(sessionAtom)
  const [atom,setAtom] = useAtom(orderAtom)
  const [order,setOrder] = useState<{id:number,items:multiProduct[]}>()
  const [loading,setLoading] = useState<boolean>(false)

  useEffect(()=>{
    setLoading(true)
      setOrder(atom)
      setAtom(undefined)
      setLoading(false)

  },[])
  if(loading){
    return <div className='h-[70vh] text-center mt-24 text-2xl font-oswald'>Loading</div>
  }
  if(session == null || order == null){
    return <div className='h-[70vh] text-center mt-24 text-2xl font-oswald'>Invalid request</div>
  }

  return (
    <article className='min-h-[70vh] p-4 '>
      <h1 className='text-center my-3 text-3xl font-bold font-oswald'>Order was sucessful:</h1>
      <section className='w-full  mx-auto mt-4 gap-4 bg-stone-300 p-4 rounded-lg sm:px-8 flex flex-col items-center '>
        <h2 className='font-oswald text-2xl'>Order number: {order.id}</h2>
        <ul className='flex flex-col w-full gap-8 h-full '>
        {order?.items.map(e=>
          <CartItem mp={e} />)}
        </ul>
      </section>
    </article>
  )
}

export default Success


const CartItem = ({mp}:{mp:multiProduct}) => {

 

  let {item,size,amount} = mp;
  return (
    <section className='w-full rounded-sm grid grid-cols-10  bg-white border-2 border-stone-400  h-auto'>
        <img className='utsm:col-span-5 sm:col-span-3 order-1 object-contain utsm:h-36 h-36 place-self-center bg-white  w-auto utxs:place-self-start' src={mp.item.images[0]} alt="" />
        <div className='utsm:col-span-10 text-lg font-semibold p-4 col-span-4 utsm:order-3 order-2 utsm:justify-between utsm:items-center sm:flex-col flex   '>
          <div className='flex-col flex'>
          <span className='font-oswald  text-stone-700'>{item.brand}</span>
          <span>{item.name}</span>
          <span>{item.color}</span>
          <span className='my-1'>Size: {size}</span>
          </div>
          <Price price={item.price} gap={true} pricefactor={item.price_factor}  />
        </div>
        <span className=' utsm:col-span-5 sm:col-span-3 sm:order-3 flex justify-center items-center utsm:order-2 '>


            
            <span className='flex items-center col-span-2 justify-center'>amount: {amount}</span>

          
        </span>
    </section>
  )
}