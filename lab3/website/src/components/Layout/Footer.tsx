import React,{useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { newsletterRequest } from '../../api'


/* Simple footer */
const Footer = () => {

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
        const resp = await newsletterRequest(email.current.value)
        if(resp == true){
          setMessage('Sucessfully added')
          email.current.value = ""
        }else{
          setMessage('Error occured, please try again later')
        }
      }
    })()
  }

  return (
    <div className='w-full h-96 utmd:h-[45rem] flex  utmd:flex-col utmd:gap-10 justify-between p-12 bg-stone-800 text-stone-200 text-lg'>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>A B O U T</h1>
        <ul className='grid gap-4 '>
          <Link to='/jargon'>About us</Link>
          <Link to='/jargon'>Contact us</Link>
          <Link to='/jargon'>Privacy Policy</Link>
          <Link to='/jargon'>Shipping Policy</Link>
        </ul>
      </section>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>M E M B E R</h1>
          <Link to='/membersclub'>Member's Club</Link>

      </section>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>N E W S L E T T E R</h1>
        <div>
        <div>Sign up to our newsletter to get the latest and greatest! <br />
          Never miss out on exclusive offers, latest releases and hot sneaker news!</div>
       <form onSubmit={addNewsletter} action="">
       <span>

        <input id="email" ref={email}  type="email" className="h-12  utmd:w-[66.59%] w-72 bg-stone-900 border-2 border-stone-300 text-white p-2" placeholder="Enter your email" />

       </span> 
       <button type='submit' className="mt-4 hover:bg-stone-900 h-12 w-32 utxs:border-l-2 border-2 border-l-0 border-stone-300 active:bg-stone-300 active:text-stone-900">Subscribe</button>
       </form>
       {message && <span className='font-bold'>{message}</span>}
        </div>
      </section>
    </div>
  )
}

export default Footer

function userRef() {
  throw new Error('Function not implemented.')
}
