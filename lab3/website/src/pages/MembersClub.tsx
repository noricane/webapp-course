import { useAtom } from "jotai";
import React from "react";
import { Link } from "react-router-dom";
import { sessionAtom } from "../model/jotai.config";


/* Feel free to ignore barely any TS (static site) */
const MembersClub = () => {
    const [user,] = useAtom(sessionAtom)

    if(user != null){
        return <div className="min-h-[65vh] flex justify-center items-center text-center  text-stone-200 bg-gradient-to-b from-stone-900 to-[#010105] font-oswald text-3xl ">Personalized member page should be here</div>
    }
    
  return (
    <div className="min-h-[65vh] flex-col flex gap-4  bg-gradient-to-b from-stone-900 to-[#010105] ">
      <h1 className="w-full text-center font-oswald text-4xl mt-4 text-stone-50">
        Member's Club
      </h1>
      <h2 className="w-full text-center font-oswald text-2xl text-stone-300">
        Experience the ultimate sneaker shopping experience with the Member's
        Club - join today and never miss a beat!
      </h2>

      <article className="text-center h-80% mb-4 rounded-lg text-stone-100 flex flex-col justify-center items-center gap-2 utsm:mx-2 max-w-[40rem] mx-auto bg-stone-700 utxs:p-2 p-8">
        <h3 className="font-oswald text-xl">Eclusive deals</h3>
        <section className="font-light mb-4">
          As a member of the Brandname Member's Club, you'll get access to
          exclusive deals and promotions that aren't available to non-members.
          This might include early access to new sneaker releases, discounts on
          select products, or free shipping on all orders.
        </section>
        <h3 className="font-oswald text-xl">Loyalty Programme</h3>
        <section className="font-light mb-4">
          We believe in rewarding our most loyal customers, which is why we've
          created the Brandname Member's Club Loyalty Programme. Every time you
          make a purchase, you'll earn points that can be redeemed for
          discounts, free products, and other perks. Plus, the more points you
          earn, the higher your membership level will be, unlocking even more
          benefits.
        </section>
        <h3 className="font-oswald text-xl">Community</h3>
        <section className="font-light mb-2">
          At Zephyr, we know that sneakers are more than just shoes - they're
          a passion. That's why we've created a community of like-minded
          sneakerheads who share your love for the game. As a member of the
          Brandname Member's Club, you'll have access to our online forum where
          you can connect with other members, trade tips and tricks, and even
          buy/sell/trade sneakers. Plus, we'll host exclusive events and meetups
          where you can bond with fellow members in person.
        </section>
      </article>
      <Link to={'/signup'}> <button className="mb-8 mx-auto p-4 h-16 w-64 rounded-sm  bg-stone-100 text-stone-800 hover:bg-stone-200 active:bg-stone-800 active:text-stone-100 transition-colors flex items-center justify-center font-oswald font-bold text-2xl ">Become a Member Now!</button></Link>
    </div>
  );
};

export default MembersClub;
