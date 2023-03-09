import React,{ useRef, useState } from "react";
import { useNavigate } from "react-router";
import ErrorSpan from "../components/Misc/ErrorSpan";


const SignUp = () => {
    const [error,setError] = useState<string>()
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const birthdate = useRef<HTMLInputElement>(null)
    const street = useRef<HTMLInputElement>(null)
    const city = useRef<HTMLInputElement>(null)
    const country = useRef<HTMLInputElement>(null)
    const zip = useRef<HTMLInputElement>(null)
    const password1 = useRef<HTMLInputElement>(null)
    const password2 = useRef<HTMLInputElement>(null)
    const nav = useNavigate()
    const submitHandler = ((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("in submithandler",password1.current?.value !==  password2.current?.value);
      
      if(name.current?.value == "" || email.current?.value == "" || birthdate.current?.value == "" || password1.current?.value == "" || password2.current?.value == ""){
        setError("Fields with * must be filled in")
      }
      if( password1.current?.value !==  password2.current?.value){
        setError("Passwords must match")
      }
    });
    const redirectHandler = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {nav('/')});
    
    return (
      <div className="min-h-[50rem] flex justify-center items-center">

        <section className="bg-stone-300  absolute h-[70%] rounded-md mx-auto min-h-[45rem] min-w-[300px] w-[80%] max-w-[55rem] flex flex-col justify-center gap-4">
          <h2 className="text-center font-oswald font-bold text-2xl">Sign Up</h2>

          <form onSubmit={submitHandler}>
              <section  className="grid grid-cols-2  utsm:grid-cols-5 items-center justify-center gap-2 p-4">
              {/* Name, Email and Brithdate */}
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="name">*Name:</label>
              <input ref={name} name="name"  type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="email">*Email:</label>
              <input ref={email} name="email" type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />
              
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="birthdate">*Birthdate:</label>
              <input ref={birthdate} name="birthdate" type="date" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />

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
              <label className=" self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="password1">*Password:</label>
              <input ref={password1} name="password1" type="password" className=" p-1 px-2 max-w-[14rem] h-8  rounded-sm  bg-stone-50 utsm:col-span-3" />

              <label className=" self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="password2">*Repeat Password:</label>
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

