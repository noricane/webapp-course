import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-96 flex  utmd:flex-col utmd:gap-10 justify-between p-12 bg-stone-800 text-stone-200 text-lg'>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>A B O U T</h1>
        <ul className='grid gap-4 '>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy Policy</li>
          <li>Shipping Policy</li>
        </ul>
      </section>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>M E M B E R</h1>
          <span>Member's Club</span>

      </section>
      <section>
        <h1 className='font-oswald text-xl font-bold mb-4'>N E W S L E T T E R</h1>
        <div>
        <div>Sign up to our newsletter to get the latest and greatest! <br />
          Never miss out on exclusive offers, latest releases and hot sneaker news!</div>
       <form action="">
       <span>

        <input id="email"  className="h-12  utmd:w-[66.59%] w-72 bg-stone-900 border-2 border-stone-300 text-white p-2" type="email" placeholder="Enter your email" />

       </span> 
       <button className="mt-4 hover:bg-stone-900 h-12 w-32 utxs:border-l-2 border-2 border-l-0 border-stone-300 active:bg-stone-300 active:text-stone-900">Subscribe</button>
       </form>
        </div>
      </section>
    </div>
  )
}

export default Footer