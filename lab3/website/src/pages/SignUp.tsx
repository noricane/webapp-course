import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React,{ useRef, useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api";
import ErrorSpan from "../components/Misc/ErrorSpan";
import { sessionAtom } from "../model/jotai.config";
import { ProductError, User } from "../model/user";


const SignUp = () => {
    const [,setUser] = useAtom(sessionAtom)
    const [error,setError] = useState<string>()
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const phone = useRef<HTMLInputElement>(null)
    const birthdate = useRef<HTMLInputElement>(null)
    const street = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)
    const country = useRef<HTMLInputElement>(null)
    const zip = useRef<HTMLInputElement>(null)
    const password1 = useRef<HTMLInputElement>(null)
    const password2 = useRef<HTMLInputElement>(null)
    
    const nav = useNavigate()
    const submitHandler = ((e: React.FormEvent<HTMLFormElement>) => {
      const refsArr = [name.current?.value, email.current?.value,phone.current?.value, street.current?.value, city.current?.value, country.current?.value, zip.current?.value, password1.current?.value, password2.current?.value]
      const isValid = ():boolean => {
        let bool = true
        refsArr.forEach(e => {
          if( e == null || typeof(e) != "string"|| e == ""){
            bool = false
          }
        })
        return bool
      }
      e.preventDefault();
      console.log("in submithandler",password1.current?.value !==  password2.current?.value);
      
      if(birthdate.current?.value == null || !isValid){
        setError("All Fields must be filled in")
      }
      if( password1.current?.value !==  password2.current?.value){
        setError("Passwords must match")
      }

      (async ()=>{
        console.log(email.current?.value);
        
        /* @ts-ignore */ // ask robin
        const resp = await registerUser(name.current?.value,email.current?.value,phone.current?.value,birthdate.current?.value,street.current?.value,city.current?.value,country.current?.value,zip.current?.value,password1.current?.value).catch(e => console.log("Error encountered",e)
        )
        console.log("resp",resp);
        
        if (resp === true){
          const cookie = Cookies.get('user')
          console.log("cookie",cookie);
          
          if (cookie == null){return}
          const object = JSON.parse(decodeURIComponent(cookie)) 
          setUser(object)
          nav('/')
          return
        }
        if(typeof(resp) == "object"){
          let str = "Unkown Error Occured"
          str = (resp as object).toString()
          setError(str) 
        }
        if(typeof(resp) == "string"){
          setError(resp) 

        }
        

        
      })()
      
    });
    const redirectHandler = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {nav('/')});
    
    return (
      <div className="min-h-[50rem]  flex justify-center items-center">

        <section className="bg-stone-300  absolute h-[70%] rounded-md mx-auto min-h-[45rem] min-w-[319px] w-[95%] sm:w-[80%] max-w-[55rem] flex flex-col justify-center gap-4">
          <h2 className="text-center font-oswald font-bold text-2xl">Sign Up</h2>

          <form onSubmit={submitHandler}>
              <section  className="grid grid-cols-2  utsm:grid-cols-5 items-center justify-center gap-2 p-4">
              {/* Name, Email and Brithdate */}
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="name">Name:</label>
              <input ref={name} name="name"  type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="email">Email:</label>
              <input ref={email} name="email" type="email" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="birthdate">Birthdate:</label>
              <input ref={birthdate} name="birthdate" type="date" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />

              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="phone">Phone nr.:</label>
              <input ref={phone} name="phone" type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              
              <span className="col-span-2 utsm:col-span-5 w-[80%] h-[1px] justify-self-center my-2 bg-stone-400 items-center"></span>

             
              {/* Address */}
              <h3 className=" text-center col-span-2 utsm:col-span-5 font-bold text-stone-600"> Delivery Address</h3>
              <label className=" self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="street">Streetname:</label>
              <input ref={street} name="street" type="text" className=" p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="city">City:</label>
              <input ref={city} name="city" type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="country">Country:</label>
              <input ref={country} name="country" type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="zipcode">Zip code:</label>
              <input ref={zip} name="zipcode" type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />

              <span className="col-span-2 utsm:col-span-5 w-[80%] h-[1px] my-2 justify-self-center bg-stone-400 items-center"></span>
             

              {/* Password */}
              <label className=" self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="password1">Password:</label>
              <input ref={password1} name="password1" type="password" className=" p-1 px-2 max-w-[14rem] h-8  rounded-sm  bg-stone-50 utsm:col-span-3" />

              <label className=" self-center justify-self-end font-bold text-md utsm:col-span-2" htmlFor="password2">Repeat Password:</label>
              <input ref={password2} name="password2" type="password" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm  bg-stone-50 utsm:col-span-3" />
              </section>
          
              <section className="flex flex-col w-full justify-center">
              {error && <ErrorSpan message={error}/>}
              <span className="w-full flex justify-center gap-4 mt-4 mb-2"> 
                <button type="submit" className="transition-all rounded-sm bg-stone-800 p-2 px-4 font-bold text-stone-100 hover:bg-stone-600 active:bg-stone-100 active:text-stone-800">Register</button>
                <button onClick={redirectHandler} className="transition-all rounded-sm bg-stone-100 p-2 px-4 font-bold text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100">Cancel</button>  
              </span>

            </section>   

                 
            </form>
          

        </section>
        
      </div>
    )
  }

export default SignUp;
function userRef<T>() {
  throw new Error("Function not implemented.");
}

