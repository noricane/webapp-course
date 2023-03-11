import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sessionAtom } from '../model/jotai.config'

const EditProduct = () => {

    
    const nav = useNavigate()
    const [session,] = useAtom(sessionAtom)
    
    if(session == null){
      return <div>Log in please</div>
    }
  return (
    <div>EditProduct</div>
  )
}

export default EditProduct