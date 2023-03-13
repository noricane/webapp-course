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
      <section className='flex-col h-full flex font-semibold text-lg '>
          {orders.length > 0 ? orders.map(e => <div>{e?.id}</div>) : <div className='text-2xl font-oswald h-full flex items-center text-stone-700'>No orders found</div>}
        </section>
        
      </div>
    </div>
    
  )
}

export default PrevOrders