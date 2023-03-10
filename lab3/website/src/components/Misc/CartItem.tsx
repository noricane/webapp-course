import React from 'react'
import { multiProduct } from '../../model/user'

const CartItem = ({mp}:{mp:multiProduct}) => {
  return (
    <section className='w-full rounded-sm grid grid-cols-10  bg-white border-2 border-stone-400  h-auto'>
        <img className='utsm:col-span-5 sm:col-span-3 order-1 object-contain utsm:h-36 h-36 place-self-center bg-white  w-auto utxs:place-self-start' src={mp.item.images[0]} alt="" />
        <div className='utsm:col-span-10 col-span-4 utsm:order-3 order-2 bg-red-200  '>asdasdjhk</div>
        <span className=' utsm:col-span-5 sm:col-span-3 sm:order-3 utsm:order-2 bg-blue-300'></span>
    </section>
  )
}

export default CartItem