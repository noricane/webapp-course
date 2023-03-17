import React, { useEffect, useRef, useState } from "react";
import { getProducts, newsletterRequest } from "../api";
import HomeHeader from "../components/Misc/HomeHeader";
import Carousel from "../components/structural/Carousel";
import { Product } from "../model/types";


const Home = () => {
  /* Same as footer code for adding an email to the newsletter  */
  //reference to access user input in email input
  const email = useRef<HTMLInputElement>(null)
  //Response
  const [message,setMessage] = useState<string|undefined>(undefined)

  //Add to newsletter
  const addNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
   //Reset error message
    setMessage(undefined)
    e.preventDefault();
    /* send request to server with newsletterRequest function and await response */
    (async()=>{
      if(email.current?.value != null){
        console.log(email.current.value);
        
        const resp = await newsletterRequest(email.current.value)
        if(resp == true){
          setMessage('Sucessfully added')

        }else{
          setMessage('Error occured, please try again later')
        }
      }
    })()
  }


  /* Just for optics, show two different lists since they claim to display two possibly different things */
  const [recommended, setRecommended] = useState<any[]>([]);
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(()=>{
    (async()=>{
     const resp = await getProducts();
     if(resp.length == 0 ){
       return
     }
     setRecommended(resp.filter((e:Product,indx:number) => indx%2==0))
     setLatest(resp.filter((e:Product,indx:number) => indx%2!=0))
    })()       
 },[])
  

  

 /*  Homepage JSX */
  return (
    <>
      <div className="shadow-md">
        <HomeHeader />
      </div>
      <div className="h-[43rem]  bg-stone-800 ">
        <h1 className="text-stone-50 text-2xl text-center relative font-bold top-8 font-oswald"> P O P U L A R &nbsp; P R O D U C T S</h1>
       <div className="relative top-16 "> <Carousel items={recommended} id="popular"/></div>
        </div>
      <div className="text-center h-[40rem] flex justify-center items-center text-stone-50 font-mono  flex-col">
      <img
        style={{left:300}}
          className="bg-stone-300  h-full opacity-80 mix-blend-luminosity  w-screen object-cover"
          src={"media/scrollshoes.png"}
        />
      <div className="py-8 utlg:w-[90vw] w-[50rem] gap-4 flex-col flex justify center absolute bg-stone-700 mx-auto utlg:px-8 p-4">
       <span> <h2 className="font-bold text-white font-oswald ">KEEP YOURSELF UPDATED!</h2>
        <h1 className="font-bold text-white font-oswald text-xl">SIGN UP TO OUR NEWS LETTER</h1></span>
        <div>Sign up to our newsletter to get the latest and greatest! <br />
          Never miss out on exclusive offers, latest releases and hot sneaker news!</div>
       <form onSubmit={addNewsletter}>
       <span>
       <label htmlFor="email" className="text-stone-50 font-bold"> Email </label>
        <input id="email" ref={email} type="email" className="h-9 utlg:w-[90%] max-w-xl w-96 bg-stone-900 border-2 border-stone-300 text-white p-2"  placeholder="Enter your email" />
       </span> <br />
       <button type="submit" className="mt-4 hover:bg-stone-900 h-12 w-32 border active:bg-stone-50 active:text-stone-900">Subscribe</button>
       </form>
       {message && <span className='font-bold'>{message}</span>}
       <span className="text-xs">By subscribing you agree to our Privacy Policy</span>
        </div>        
      </div>
      <div className="h-[42rem] flex flex-col justify-end  bg-stone-800  ">
        <h1 className="text-stone-50 text-2xl text-center relative font-bold top-8 font-oswald">S H O P &nbsp; O U R &nbsp; L A T E S T &nbsp; A R R I V A L S</h1>
          <Carousel items={latest} id="latest"/>
        </div>

        <div className="w-full h-[1px] bg-stone-600"></div>
    </>
  );
};

export default Home;
