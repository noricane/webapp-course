import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router'
import CartItem from '../components/Misc/CartItem'
import { cartAtom } from '../model/jotai.config'

const Cart = () => {
    const nav = useNavigate()
    const [cart,setCart] = useAtom(cartAtom)
    if(cart.length == 0){
        return <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl flex flex-col justify-center items-center font-oswald text-3xl'>
            Cart is empty
            <span className='text-lg text-stone-700 text-center'>Consider adding products before checking cart</span>
        </div>
    
    }
  return (
    <div className=' min-h-[35rem] utsm:p-4 max-w-[1000px] mx-auto flex flex-col gap-4 overflow-scroll p-8 bg-stone-300 m-12 rounded-xl'>
        <span className='w-full text-3xl font-bold text-center font-oswald'>Cart</span>
        <div className='h-[32rem] flex flex-col gap-4 overflow-scroll'>
            {cart.map(e => <CartItem mp={e}/>)}
        </div>
        <div className='flex justify-center items-center mt-5 gap-8'>
        <button className='button bg-stone-800 h-12 w-48 button transition-all rounded-sm  p-2 px-4 font-bold text-stone-100 hover:bg-stone-200 hover:text-stone-800 active:bg-stone-800 active:text-stone-100'>Confirm Choices</button>
        <button onClick={e => nav('/')} className=" h-12 button transition-all rounded-sm bg-stone-100 p-2 px-4 font-bold text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100">Cancel</button></div>  
    </div>
  )
}

export default Cart