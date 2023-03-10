import { useAtom } from 'jotai'
import React from 'react'
import { cartAtom } from '../model/jotai.config'

const Cart = () => {
    const [cart,setCart] = useAtom(cartAtom)
  return (
    <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl'>{cart.map(e => <div>{e.amount}</div>)}</div>
  )
}

export default Cart