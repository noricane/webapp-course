import React from "react";

const SignIn = () => {
    

    return (
      <div className="min-h-[45rem] flex justify-center items-center">

        <section className="bg-stone-300  absolute h-[60%] rounded-lg mx-auto min-h-[30rem] min-w-[300px] w-[80%] max-w-[55rem] flex flex-col justify-center gap-4">
          <h2 className="text-center font-oswald font-bold text-2xl">Sign In</h2>

          <form className="">
              <section className="grid grid-cols-2  utsm:grid-cols-5 items-center justify-center gap-2 p-4">
              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="email">Email:</label>
              <input type="text" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm bg-stone-50 utsm:col-span-3" />

              <label className="self-center justify-self-end font-bold text-lg utsm:col-span-2" htmlFor="password">Password:</label>
              <input type="password" className="p-1 px-2 max-w-[14rem] h-8  rounded-sm  bg-stone-50 utsm:col-span-3" />
              </section>
          
              <section className="flex flex-col w-full justify-center">
              <span className="w-full flex justify-center gap-4 mb-2"> 
                <button className="transition-all rounded-sm bg-stone-800 p-2 px-4 font-bold text-stone-100 hover:bg-stone-600 active:bg-stone-100 active:text-stone-800">Log In</button>
                <button className="transition-all rounded-sm bg-stone-100 p-2 px-4 font-bold text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100">Cancel</button>  
              </span>

              <button className="text-stone-600">forgot password?</button>
            </section>   

                 
            </form>
          

        </section>
        
      </div>
    )
  }

export default SignIn;
