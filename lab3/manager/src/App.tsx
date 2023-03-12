import axios from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { sessionAtom } from './model/jotai.config';
import AddProduct from './pages/AddProduct';
import AddVariant from './pages/AddVariant';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/EditProduct';

import Login from './pages/Login';
import NotFound from './pages/NotFound';

axios.defaults.withCredentials = true;


function App() {

  const [session,setSession] = useAtom(sessionAtom)    
  const nav = useNavigate()
  
  
  useEffect(()=>{
    const cookie = Cookies.get('user') as string
    if(cookie != null){
    const object = JSON.parse(decodeURIComponent(cookie)) 
    setSession(object)
    }else{
      nav('/')
    }
  },[])


  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/addproduct" element={<AddProduct />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/addvariant/:id" element={<AddVariant />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />


    </Routes>
  )
  

}

export default App;
