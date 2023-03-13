import axios from "axios";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { getUserInfo } from "./api";
import { updateCart } from "./helper/utils";
import { cartAtom, sessionAtom } from "./model/jotai.config";
import { multiProduct } from "./model/types";
import Account from "./pages/Account";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";

import Home from "./pages/Home";
import Jargon from "./pages/Jargon";
import MembersClub from "./pages/MembersClub";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";

axios.defaults.withCredentials = true;

function App() {
  const [user,setUser] = useAtom(sessionAtom)    
  const [cart,setCart] = useAtom(cartAtom)    

  useEffect(()=>{
    const cookie = Cookies.get('user') as string
    if(cookie != null){
      const object = JSON.parse(decodeURIComponent(cookie))
      sessionStorage.setItem('user',object)
      setUser(object)
    }else{
    Cookies.set('cart',JSON.stringify([]))
      
    }
    (async () => {
      try{
        const cartcookie = JSON.parse(decodeURIComponent(Cookies.get('cart') as string))
        
        if(cartcookie != null){
          const updatedCart = await updateCart(cartcookie)
          if(Array.isArray(updatedCart) ){
            setCart(updatedCart)
          }else{
            setCart([])
          }
        }
        
      }catch(error){console.log(error);    }
    })()
  },[])

  useEffect(()=>{
    console.log("in app");
    
    if(cart.length == 0) {Cookies.set('cart',JSON.stringify([]))}
    Cookies.set('cart',JSON.stringify(cart))
    console.log(JSON.parse(decodeURIComponent(Cookies.get('cart') as string)));

  },[cart])
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/news" element={<News />} />
      <Route path="/membersclub" element={<MembersClub />} />
      <Route path="/account" element={<Account />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/success" element={<Success />} />
      <Route path="/jargon" element={<Jargon />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
