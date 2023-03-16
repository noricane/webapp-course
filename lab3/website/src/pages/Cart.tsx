import { useAtom } from 'jotai'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { processOrder } from '../api'
import CartItem from '../components/Misc/CartItem'
import ErrorSpan from '../components/Misc/ErrorSpan'
import { cartAtom, orderAtom, sessionAtom } from '../model/jotai.config'
import { PastOrder, User } from '../model/types'

const Cart = () => {
    const nav = useNavigate()
    const [cart,setCart] = useAtom(cartAtom)
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)
    const [session, setSession] = useAtom(sessionAtom)
    const [order, setOrder] = useAtom(orderAtom)
    const purchaseHandler = () => {
        
        (async()=>{
            if(session == null){return}
            const resp = await processOrder(session.email,cart)
            console.log(resp);
            
            if(typeof resp == "string"){
                /* Type not matching cart type */
                setError(resp)
            }else if(Array.isArray(resp) || resp.id == null){
                /* Not PastOrder maning that no order has been processed since the cart didn't match what was on the server, we've received an updated cart instead */
                console.log(resp);
                console.log("setting");
                setError("One or more items just became unavailable, please try again")
                setCart(prev => Array.isArray(resp) ? resp : prev)
            
            }else if(resp.id && resp.items.length>0 && session != null){
                /* PastOrder, meaning that the order was successfully processed and added. */
                const newOrder:PastOrder = {id:resp.id,items:resp.items}
                /* Order Atom to save order when moving to success page */
                setOrder(newOrder)
                setSession(prev =>  {
                    /* Update local user order list until it's been updated */
                    if(prev == null){return}
                    const orders = Array.isArray(prev.orders) ? [...prev.orders] : [];
                    orders.push(newOrder)
                    localStorage.setItem('user',JSON.stringify({...prev,orders:orders}))
                    return {...prev,orders:orders}
                })
                /* Empty the cart */
                localStorage.setItem('cart',JSON.stringify([]))
                setCart([])
                nav(`/success`)
                
            }

            
        })()
    }
    /* Super hacky solution, but I don't have time to fix minor unintended behavior */
    useEffect(()=>{
        setTimeout(()=>setLoading(false),300)
    },[])

    if(loading){
        return <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl flex flex-col justify-center items-center font-oswald text-3xl'>
            LOADING...
        </div>
    }
    if(cart.length == 0){
        return <div className='min-h-[70vh] p-8 bg-stone-300 m-12 rounded-xl flex flex-col justify-center items-center font-oswald text-3xl'>
            Cart is empty
            <span className='text-lg text-stone-700 text-center'>Consider adding products before checking cart</span>
        </div>
    
    }
  return (
    <div className=' min-h-[35rem] utsm:p-4  mx-auto flex flex-col gap-4 p-8 bg-stone-300 m-12 rounded-xl'>
        <span className='w-full text-3xl font-bold text-center font-oswald'>Cart</span>
        <div className='h-[32rem] flex px-4 flex-col gap-4 rounded-3xl overflow-scroll'>
            {cart.map(e => <CartItem  mp={e}/>)}
        </div>
            {error && <ErrorSpan message={error}/>}
        <div className='flex justify-center items-center mt-5 gap-8'>
        <button onClick={purchaseHandler} className='button bg-stone-800 h-12 w-48 button transition-all rounded-sm  p-2 px-4 font-bold text-stone-100 hover:bg-stone-700  active:bg-stone-50 active:text-stone-800'>Confirm Choices</button>
        <button onClick={e => nav('/')} className=" h-12 button transition-all rounded-sm bg-stone-100 p-2 px-4 font-bold text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100">Cancel</button></div>  
    </div>
  )
}

export default Cart