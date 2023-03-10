import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import PersonalInfo from '../components/Account/PersonalInfo'
import PrevOrders from '../components/Account/PrevOrders'
import ProfileSettings from '../components/Account/ProfileSettings'
import ErrorSpan from '../components/Misc/ErrorSpan'
import { sessionAtom } from '../model/jotai.config'

const Account = ({PropPage=<PersonalInfo />}:{PropPage?:JSX.Element}) => {
  const [CURRENT,SETCURRENT] = useState<JSX.Element>()
  const [user,] = useAtom(sessionAtom)
  console.log(user);
  useEffect(()=>{
  SETCURRENT(PropPage)

  },[])
  if(user == null) {
    return <div className='min-h-[60vh] flex justify-center items-center font-oswald text-4xl'>Please Log In</div>
    
  }
  return (
    <div className='min-h-[60vh] grid grid-cols-7'>
      <section className='col-span-2 utsm:col-span-3 flex font-oswald gap-4 text-lg flex-col p-4 items-start border-r-2'>
        <h2 className=' mb-4 font-oswald text-2xl'>My Account</h2>
        <button onClick={()=>SETCURRENT(<PersonalInfo/>)}>Personal Information</button>
        <button onClick={()=>SETCURRENT(<PrevOrders/>)}>Previous Orders</button>
        <button onClick={()=>SETCURRENT(<ProfileSettings/>)}>Settings</button>
      </section>
      <section>
          {CURRENT}
      </section>
    </div>
  )
}

export default Account