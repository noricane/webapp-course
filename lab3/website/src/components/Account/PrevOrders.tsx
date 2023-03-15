import { useEffect, useState } from 'react'
import { multiProduct, User } from '../../model/types'

/* Previous orders section of the Account page */
const PrevOrders = ({user}:{user:User}) => {
  const [orders, setOrders] = useState<{id:number,items:multiProduct[]}[]>([])

  /* re-set orders everytime user object changes */
  useEffect(()=>{
    (async()=>{
      setOrders(user.orders)
      console.log(user.orders);
    })()
  },[user])

  /* Display orders */
  return (
    <div className='w-full h-[100%]  py-8 px-4 bg-stone-200 '>
    <div className='w-full h-[100%] items-center mx-auto bg-stone-300 rounded-lg py-4 flex flex-col'>
      <h1 className='mb-4 font-oswald text-2xl'>Orders</h1>
      <section className='flex-col gap-3 h-full flex overflow-scroll font-semibold text-lg '>
          {orders.length > 0 ? 
                      orders.map(order => <Order id={order.id} items={order.items}/>) : 
                      <div className='text-2xl font-oswald h-full flex items-center text-stone-700'>No orders found</div>}
        </section>
        
      </div>
    </div>
    
  )
}

export default PrevOrders

const Order = ({id,items}:{id:number,items:multiProduct[]}) => {
  const [open, setOpen] = useState<boolean>(false)
  let price = 0;
 

  return (
    <section className='w-96 rounded-sm grid grid-cols-10  bg-white border-2 border-stone-400  h-auto'>
          <div className='w-full col-span-10  flex justify-between p-2 px-4'>
            <span className='font-oswald   text-stone-700'>{id}</span>   
            <button onClick={()=>setOpen(prev => !prev)} className='border-2 border-stone-300 py-1 px-2 rounded-sm w-24 hover:bg-stone-300 active:bg-stone-400'>{open ? 'Close' : 'Open'}</button>
          </div>
        {open && 

            <>
            {items.map(element => {

              
              return<div className='flex col-span-full px-2 justify-between items-center w-full'>
              <img className='  object-contain utsm:h-36 h-36 place-self-center bg-white  ' src={element.item.images[0]} alt="" />
               <div>
                <h1 className='justify-self-end font-oswald'>{element.item.brand}</h1>
                <h2 className='justify-self-end text-stone-600'>{element.item.color}</h2>
                <h2 className='justify-self-end text-stone-600 font-normal' >Size: {element.size}</h2>
                <span className='justify-self-end font-normal'>Amount: {element.amount}</span>
               </div>
               </div>
            })}
            </>

          }
        <span className=' utsm:col-span-5 sm:col-span-3 sm:order-3 flex justify-center items-center utsm:order-2 '>
         
        </span>
    </section>
  )
}