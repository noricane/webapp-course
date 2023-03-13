import React, { useEffect, useState } from 'react'
import { addressType, User } from '../../model/types'

const PersonalInfo = ({user}:{user:User}) => {
  const [deliveryAddresses, setDeliveryAddresses] =useState<JSX.Element[]>([])
  const [billingAddresses, setBillingAddresses] =useState<JSX.Element[]>([])
  useEffect(()=>{
    user.adresses.map(e =>{ 
      if(e.type == addressType['DELIVERY'] ){
        setDeliveryAddresses(prev => [...prev,(
          <ul className='text-stone-600 font-normal'>
            <li>{e.street}</li>
            <li>{e.city}</li>
            <li>{e.zip}</li>
            <li>{e.country}</li>
          </ul>)])
      }else{
        setBillingAddresses(
          prev => [...prev,(
          <ul>
            <li>{e.street}</li>
            <li>{e.city}</li>
            <li>{e.zip}</li>
            <li>{e.country}</li>
          </ul>)]
        )
      }
    })
  }
      ,[])
  return (
    <div className='w-full h-[100%]  py-8 px-4 bg-stone-200 '>
    <div className='w-full h-[100%] items-center mx-auto bg-stone-300 rounded-lg py-4 flex flex-col'>
      <h1 className='mb-4 font-oswald text-2xl'>Personal Information</h1>
      <section className='flex-col flex font-semibold text-lg '>
        <h2 className='mb-2'>Profile info:</h2>
        <span>Name: {user.name}</span>
        <span>Email: {user.email}</span>
        <span>Birthdate: {new Date(user.birthdate).toLocaleDateString()}</span>

      </section>  
      <div className='w-[80%]  h-[1px] my-4 bg-stone-400'></div>
      <div className='flex-col min-w-[50%] overflow-scroll items-center flex font-semibold md:text-lg'>
        <h2>Delivery Addresses</h2>
        <section>
          {deliveryAddresses.length > 0 ? deliveryAddresses : <span className='font-light text-stone-700'>No adresses found</span>}
        </section>
        <section className='mt-4'>
        <h2>Billing Addresses</h2>
          {deliveryAddresses.length > 0 ? deliveryAddresses : <span className='font-light text-stone-700'>No adresses found</span>}
          {billingAddresses.length > 0 ? billingAddresses : <span className='font-light text-stone-700'>No adresses found</span>}
        </section>
      </div>
    </div>
    </div>
  )
}

export default PersonalInfo