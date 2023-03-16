
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteUser } from '../../api'
import { sessionAtom } from '../../model/jotai.config'
import { User } from '../../model/types'
import Input from '../HTML/Input'
import ErrorSpan from '../Misc/ErrorSpan'


/* Settings section of the Account page, 
page for allowing email and password changes */
const ProfileSettings = ({user}:{user:User}) => {
  const nav = useNavigate()
  const [message, setMessage] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password1, setPassword1] = useState<string>()
  const [password2, setPassword2] = useState<string>()
  const [,setSession] = useAtom(sessionAtom)
  const logOutHandler = () => {
    setSession(undefined)
    localStorage.removeItem('user')
    nav('/')
  }
  const deleteHandler = () => {
    deleteUser(user.email)
    localStorage.removeItem('user')
    setMessage("Deleting...")
    setTimeout(()=>{nav('/');nav(0)},1000)
  }

  return (
    <div className='w-full h-[100%]  py-8 px-4 bg-stone-200  '>
    <div className='w-full h-[100%] items-center mx-auto bg-stone-300 rounded-lg py-4 grid grid-cols-2 gap-2'>
      <span className='flex flex-col items-center justify-center col-span-2 sm:grid grid-cols-2'>
        <label htmlFor="email" className='col-span-1 justify-self-end font-bold text-lg'>Email:&nbsp;</label>
        <Input width='w-[80%]' value={email} onChange={setEmail} name='email' />
      </span>
      <span className='flex flex-col items-center justify-center col-span-2 sm:grid grid-cols-2'>
        <label htmlFor="password1" className='col-span-1 justify-self-end font-bold text-lg'>Password:&nbsp;</label>
        <Input width='w-[80%]' value={password1} onChange={setPassword1} name='password1' type={'password'}/>
      </span>
      <span className='flex flex-col items-center justify-center col-span-2 sm:grid grid-cols-2'>
        <label htmlFor="password2" className='col-span-1 justify-self-end font-bold text-lg'>Repeat password:&nbsp;</label>
        <Input width='w-[80%]' value={password2} onChange={setPassword2} name='password2' type={'password'} />

      </span>
      <button onClick={()=>logOutHandler()} className='justify-self-end w-24 h-12 bg-stone-800 text-red-500 font-bold'>Log out</button>
      <button onClick={()=>deleteHandler()} className='justify-self-start w-36 h-12 bg-stone-800 text-red-500 font-bold'>Delete Account</button>
      <div className='col-span-full text-center'>{message && <ErrorSpan message={message}/>}</div>
    </div>
    </div>
  )
}

export default ProfileSettings