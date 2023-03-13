import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import PersonalInfo from '../components/Account/PersonalInfo'
import PrevOrders from '../components/Account/PrevOrders'
import ProfileSettings from '../components/Account/ProfileSettings'
import ErrorSpan from '../components/Misc/ErrorSpan'
import { sessionAtom } from '../model/jotai.config'
import { User } from '../model/types'

const Account = ({PropPage=PersonalInfo}:{PropPage?:({user}:{user:User}) => JSX.Element}) => {
  const [CURRENT,SETCURRENT] = useState<JSX.Element>()
  const [user,] = useAtom(sessionAtom)
  const location = useLocation();

  console.log(user);
  useEffect(()=>{
    const COMPONENT = location.state?.ProfileSettings
    if(COMPONENT != null && typeof(COMPONENT) == "function"){
      console.log("component",COMPONENT);
      
      SETCURRENT(<COMPONENT/>)
    }else if(user != null){
      console.log("component",COMPONENT);
      
      SETCURRENT(<PropPage user={user}/>)
    }
    
  },[user])

  if(user == null) {
    return <div className='min-h-[60vh] flex justify-center items-center font-oswald text-4xl'>Please Log In</div>
    
  }
  return (
    <div className='min-h-[60vh] grid grid-cols-7'>
      <section className='col-span-2 utsm:col-span-3 shadow-lg z-[1]  [&>button]:text-start flex font-oswald gap-4 text-lg flex-col p-4 items-start border-stone-300 border-r-[1px]'>
        <h2 className=' mb-4 font-oswald text-2xl'>My Account</h2>
        <button onClick={()=>SETCURRENT(<PersonalInfo user={user}/>)}>Personal Information</button>
        <button onClick={()=>SETCURRENT(<PrevOrders user={user}/>)}>Previous Orders</button>
        <button onClick={()=>SETCURRENT(<ProfileSettings user={user}/>)}>Settings</button>
      </section>
      <section className='col-span-5 utsm:col-span-4'>
          {CURRENT}
      </section>
    </div>
  )
}

export default Account