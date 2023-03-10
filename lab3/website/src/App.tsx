import axios from "axios";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { sessionAtom } from "./model/jotai.config";
import Account from "./pages/Account";
import Browse from "./pages/Browse";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

axios.defaults.withCredentials = true;

function App() {
  const [user,setUser] = useAtom(sessionAtom)    

  useEffect(()=>{
    const cookie = Cookies.get('user') as string
    if(cookie != null){
    const object = JSON.parse(decodeURIComponent(cookie)) 
      setUser(object)
    }
  },[])
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/account" element={<Account />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
