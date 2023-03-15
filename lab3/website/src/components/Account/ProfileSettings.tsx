
import { useAtom } from 'jotai'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { sessionAtom } from '../../model/jotai.config'
import { User } from '../../model/types'

/* Settings section of the Account page, 
page for allowing email and password changes */
const ProfileSettings = ({user}:{user:User}) => {
  const nav = useNavigate()
  const [,setSession] = useAtom(sessionAtom)
  const logOutHandler = () => {
    setSession(undefined)
    Cookies.remove('user')
    nav('/')
  }
  return (
    <div>
      <button onClick={()=>logOutHandler()} className='w-24 h-12 bg-stone-800 text-red-500 font-bold'>Log out</button>
    </div>
  )
}

export default ProfileSettings