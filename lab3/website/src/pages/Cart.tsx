import { useAtom } from 'jotai'
import React from 'react'
import { cartAtom } from '../model/jotai.config'

const Cart = () => {
    const [cart,setCart] = useAtom(cartAtom)
    if(cart.length == 0){
        return <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl flex flex-col justify-center items-center font-oswald text-3xl'>
            Cart is empty
            <span className='text-lg text-stone-700 text-center'>Consider adding products before checking cart</span>
        </div>
    
    }
  return (
    <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl'>{cart.map(e => <div>{e.amount}</div>)}</div>
  )
}

export default Cart