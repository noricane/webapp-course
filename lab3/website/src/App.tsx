import axios from "axios";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { cartAtom, sessionAtom } from "./model/jotai.config";
import { multiProduct } from "./model/user";
import Account from "./pages/Account";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

axios.defaults.withCredentials = true;

function App() {
  const [user,setUser] = useAtom(sessionAtom)    
  const [cart,setCart] = useAtom(cartAtom)    

  useEffect(()=>{
    const cookie = Cookies.get('user') as string
    if(cookie != null){
    const object = JSON.parse(decodeURIComponent(cookie)) 
      setUser(object)
    }
    try{
      const cartcookie = JSON.parse(decodeURIComponent(Cookies.get('cart') as string))
      if(cartcookie != null){
        setCart(cartcookie)
      }
    }catch(error){console.log(error);    }
  },[])
  useEffect(()=>{
    console.log("in app");
    
    if(cart.length == 0) {return}
    Cookies.set('cart',JSON.stringify(cart))
    console.log(JSON.parse(decodeURIComponent(Cookies.get('cart') as string)));

  },[cart])
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/account" element={<Account />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
