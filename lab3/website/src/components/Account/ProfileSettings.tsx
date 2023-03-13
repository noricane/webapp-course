
import { User } from '../../model/types'

/* Settings section of the Account page, 
page for allowing email and password changes */
const ProfileSettings = ({user}:{user:User}) => {


  return (
    <div>
      {user.email}
    </div>
  )
}

export default ProfileSettings