import React from 'react'
import { User } from '../../model/types'

const ProfileSettings = ({user}:{user:User}) => {
  return (
    <div>
      {user.email}
    </div>
  )
}

export default ProfileSettings