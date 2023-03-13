import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { cartAtom } from '../../model/jotai.config';
import { multiProduct } from '../../model/types'
import Price from './Price';
import { TiDeleteOutline } from "react-icons/ti";
import Cookies from 'js-cookie';



/* Cart Item Component, appears while on cart page and cart isn't empty */
const CartItem = ({mp}:{mp:multiProduct}) => {

  /* Handle user amount change and reject if amount is not allowed */
  const amountHandler = (arg:string) =>{
    const query = item.stock.find(e => e.size ==size)
    if(query == null){return}
    const index = cart.indexOf(mp)
    const cartItem:multiProduct = cart[index]
    switch (arg) {
      case '+':
         if(amount < query.amount){
          cartItem.amount++
          setCart([...cart.slice(0,index),cartItem,...cart.slice(index+1,)]) 
        }
        break;
      case '-':
        if(amount > 0){
          cartItem.amount--
          if(cartItem.amount == 0){
            setCart([...cart.slice(0,index),...cart.slice(index+1,)])
            return
          }
          setCart([...cart.slice(0,index),cartItem,...cart.slice(index+1,)])
        }
        break;
    }
  } 

  
  
  let {item,size,amount} = mp;
  const [cart,setCart] = useAtom(cartAtom)

  /* Remove item if amount is 0 on component's first load */
  useEffect(()=>{
    if(amount == 0){
      setCart(prev => prev.filter(e => e.item.id != mp.item.id || e.size != mp.size))
    }
  },[])
  
  
  return (
    <section className='w-full rounded-sm grid grid-cols-10  bg-white border-2 border-stone-400  h-auto'>
        <img className='utsm:col-span-5 sm:col-span-3 order-1 object-contain utsm:h-36 h-36 place-self-center bg-white  w-auto utxs:place-self-start' src={mp.item.images[0]} alt="" />
        <div className='utsm:col-span-10 text-lg font-semibold p-4 col-span-4 utsm:order-3 order-2 utsm:justify-between utsm:items-center sm:flex-col flex   '>
          <div className='flex-col flex'>
          <span className='font-oswald  text-stone-700'>{item.brand}</span>
          <span>{item.name}</span>
          <span>{item.color}</span>
          {size}
          </div>
          <Price price={item.price} gap={true} pricefactor={item.price_factor}  />
        </div>
        <span className=' utsm:col-span-5 sm:col-span-3 sm:order-3 flex justify-center items-center utsm:order-2 '>
          <div className='w-28 h-16 grid grid-cols-3 bg-stone-200 rounded-sm'>

            <span className='col-span-1 gap-[1px] flex flex-col'>
              <button onClick={()=>amountHandler('+')} className='h-full border-[1px] border-stone-2200 bg-stone-300 rounded-sm hover:bg-stone-400 active:text-stone-50 active:bg-stone-800'>+</button>
              <button onClick={()=>amountHandler('-')} className='h-full border-[1px] border-stone-2200 bg-stone-300 rounded-sm hover:bg-stone-400 active:text-stone-50 active:bg-stone-800'>-</button>
            </span>
            <span className='flex items-center col-span-2 justify-center'>{amount}</span>
          </div>
          <TiDeleteOutline className='cursor-pointer text-stone-500 hover:text-stone-800 transition-colors ml-2 font-bold' onClick={()=>{
            //Remove item from cart and update cookie onclick
            setCart(prev => {
              const newList = prev.filter(e => e.item.id != mp.item.id || e.size != mp.size);
              Cookies.set('cart',JSON.stringify(newList));             
              return newList
              })}
            
            }  size={40} />

        </span>
    </section>
  )
}

export default CartItem