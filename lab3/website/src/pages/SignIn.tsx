import React, { useRef, useState } from "react";
import { sessionAtom } from "../model/jotai.config";
import { useAtom } from "jotai";
import ErrorSpan from "../components/Misc/ErrorSpan";
import { useNavigate } from "react-router";
import { logInUser } from "../api";
import Input from "../components/HTML/Input";


/* Sign in page */
const  SignIn = () => {
  const [,setUser] = useAtom(sessionAtom)    
  const nav =useNavigate();
  /* State to handle input */
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [error, setError] = useState<string>()

  const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email == null || password == null){
      setError("Email and Password must be non empty")
      return
    }
    setError(undefined)
    try{
      const em:string = email;
      const pw: string = password;
      (async()=>{
        const resp = await logInUser(em,pw)
        console.log("in signin",resp);
        const userStore = localStorage.getItem('user')
        if( userStore != null || typeof resp != "string" && resp?.id != null){
          setUser(JSON.parse(userStore as string))
          nav('/')
          return
        }
        setUser(undefined)
        setError(resp as string)
      })()
    }catch(err:any){
      console.log(err);
    }      
  }
    
    
    return (
      <div className="min-h-[45rem] flex justify-center items-center">
        <section className="bg-stone-300  absolute h-[60%] rounded-lg mx-auto min-h-[30rem] min-w-[300px] w-[80%] max-w-[55rem] flex flex-col justify-center gap-4">
          <h2 className="text-center font-oswald font-bold text-2xl">Sign In</h2>

          <form onSubmit={submitHandler}>
              <section className="grid grid-cols-2  utsm:grid-cols-5 items-center justify-center gap-2 p-4">
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="email">Email:</label>
              {/* sneaked in grid breakpoint in width property since it is set in classname */}
              <Input name='email' value={email} width='utsm:w-[80%] sm:w-[14rem] utsm:col-span-3' onChange={setEmail}  />

              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="password">Password:</label>
              <Input name='password' width="utsm:w-[80%] sm:w-[14rem]  utsm:col-span-3" value={password} onChange={setPassword} type='password'  />
              </section>
          
              <section className="flex flex-col w-full justify-center">
              <span className="w-full flex justify-center gap-4 mb-2"> 
                <button type="submit" className="button transition-all rounded-sm bg-stone-800 p-2 px-4 font-bold text-stone-100 hover:bg-stone-600 active:bg-stone-100 active:text-stone-800">Log In</button>
                <button onClick={e => nav('/')} className="button transition-all rounded-sm bg-stone-100 p-2 px-4 font-bold text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100">Cancel</button>  
              </span>
              {/* If error display here */}
              {error && <ErrorSpan message={error}/>}
              <button  className="text-stone-600">forgot password?</button>
            </section>   

                 
            </form>
          

        </section>
        
      </div>
    )
  }

export default SignIn;
