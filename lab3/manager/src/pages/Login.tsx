import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser } from "../components/api";
import Card from "../components/Structural/Card";
import { sessionAtom } from "../model/jotai.config";
const Login = () => {
  const nav = useNavigate();
  const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>()
    const [session,setSession] = useAtom(sessionAtom)
    useEffect(() => {if(session!=null){nav('/dashboard')}}, [session])
    const loginHandler = () => {
      
      setError(undefined)
      if (email.current?.value == null || email.current?.value == "" || password.current?.value == null || password.current?.value == ""){
        setError("Email and Password must be non empty")
        return
      }else{
        try{
          const em:string = email.current.value;
          const pw: string = password.current.value;
          (async()=>{
            const resp = await logInUser(em,pw)
            if(typeof resp == "string"){
              setError(resp)
              return
            }

            setSession(resp)
            nav('/dashboard')
          })()




        }catch(err:any){
          console.log(err); 
        }
      }

      
    }

   
  return (
    <div className=" font-bold font-oswald flex items-center ">
      <Card>

        <h1 className="font-oswald text-3xl font-bold my-24">ADMIN LOGIN</h1>
        <form className="flex flex-col  justify-center gap-6">
            <Input ref={email} title="USERNAME" type="text" />

            <Input ref={password} title="PASSWORD" type="password" />

            <span className="[&>button]:mx-2 utxs:[&>button]:my-2">
                <Button title="LOG IN" onClick={(e:React.FormEvent<HTMLFormElement>)=>loginHandler()}/>
            </span>
                {error && <span className="text-red-500 font-bold text-center w-full">{error}</span>}
        </form>
      </Card>
    </div>
  );
};

export default Login;





export const Button = ({title,onClick}:{title:string,onClick:Function}) => {
  return (
    <button type="submit" className="bg-stone-300 w-36 h-10 hover:bg-stone-400 active:bg-stone-50 active:text-stone-800" onClick={(e:React.MouseEvent)=>
        {
            e.preventDefault()
            onClick()
        }}>{title}</button>
  )
}


 const Input = forwardRef(function Input({type,title}: {type:string, title:string} , ref:(React.LegacyRef<HTMLInputElement> | undefined)){
    const titleLowerCase = title.toLowerCase()
  return (
    <div className="flex utxs:flex-col  self-center items-center justify-center">
        <label htmlFor={`${titleLowerCase}`} className=" text-lg ">{title}</label>
            <input ref={ref} type={`${type}`} name={`${titleLowerCase}`} id={`${titleLowerCase}`} className="bg-stone-50 h-8 utxs:w-48 p-2 w-64 ml-4" />
    </div>
  )
})
