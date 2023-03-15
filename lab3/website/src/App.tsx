import axios from "axios";
import { useAtom } from "jotai";

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
    /* const cookie = Cookies.get('cart') as string
    console.log(cookie);
    
    if(cookie != null){
      const object = JSON.parse(decodeURIComponent(cookie))
      console.log(object);
      
      Cookies.set('user',object)
      setUser(object)
    }else{
    Cookies.set('cart',JSON.stringify([]))
      
    } */
    (async () => {
      try{
        const userstore = localStorage.getItem('user')       
        const cartstore = localStorage.getItem('cart')
        //console.log("Cartstore",cartstore);
        


        
        if(cartstore != null){
          console.log("Before update", cartstore.length);
          
          const updatedCart = await updateCart(JSON.parse(cartstore))
          console.log("after update", updateCart.length);
          if(Array.isArray(updatedCart) ){
            console.log("updatecart here");
            setCart(updatedCart)


          }else{
            console.log("no resp");
            
            setCart([])
          }
        }
        if(userstore != null){
          const parsed = JSON.parse(userstore)
          setUser(JSON.parse(userstore))
          const resp = await getUserInfo(parsed.email)
          if(resp.id == parsed.id){
            console.log("before problem");
            
            //Cookies.set('user',JSON.stringify(resp))
            localStorage.setItem('user',JSON.stringify(resp))
            setUser(resp)

          }
          //console.log("resp is ",resp);

          
        }
      }catch(error){console.log(error);    }
    })()
  },[])

  useEffect(()=>{
    console.log("in app useeffect");
    if(cart.length == 0) {
      localStorage.setItem('cart',JSON.stringify([]))
      return
    }

    localStorage.setItem('cart',JSON.stringify(cart))

    //console.log("store",localStorage.getItem('cart'));
    

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
