import React from "react";
import Article from "../components/Misc/Article";


/* Static news page */
const News = () => {
    const lorem:string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iste
    est voluptatibus quod nobis officia ratione molestiae tempora numquam
    architecto corporis, earum nam? Magni hic natus sed alias corrupti et?`;

  return (
    <div className="min-h-[65vh] max-h-[200vh] flex-col flex gap-4 bg-gradient-to-b from-stone-900 to-[#010105] ">
      <h1 className="w-full text-center font-oswald text-4xl mt-4 text-stone-50">
        Zephyr News
      </h1>
      <h2 className="w-full text-center font-oswald text-2xl text-stone-300">
        Keep up-to-date with the latest in sneakers and our business.
      </h2>

      <section className="text-center h-80% mb-4  rounded-lg text-stone-100 flex flex-col justify-center items-center gap-2 utsm:mx-2 max-w-[40rem] mx-auto bg-stone-800 p-8">
      <Article  title={"LeBron's Nike Air Zoom Generation to Release in a 'Dark Grey' Colorway"} image={"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2Fnike-air-zoom-generation-dark-grey-DR0455-001-release-date-0.jpg?fit=max&cbr=1&q=90&w=750&h=500"}> {lorem} </Article>
      <Article  title={"Event on the 2nd of March"} image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.rawpixel.com%2Fs3fs-private%2Frawpixel_images%2Fwebsite_content%2Fvprojectold1-ning-1209_2.jpg%3Fw%3D1000%26dpr%3D1%26fit%3Ddefault%26crop%3Ddefault%26q%3D65%26vib%3D3%26con%3D3%26usm%3D15%26bg%3DF4F4F3%26ixlib%3Djs-2.2.1%26s%3D8b7da65085042cf25cdd954c9b22e2ae&f=1&nofb=1&ipt=b42dffa5ef1d9e1b4ab7be3e237cda164fb3839a18da82a408ff26746d72806d&ipo=images"}> {lorem} </Article>
      <Article  title={"We will be stocking the all new 'X' on Monday 🎉 "} image={"https://media.istockphoto.com/id/1337191336/sv/foto/black-fashion-sport-shoe-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=u8-uWbDMyc77Q7ujfCpGnAwQHxxoS8ITFqi5Zp9IUdo="}> {lorem} </Article>
      <Article  title={"An April Skateboards x Nike SB Dunk Low Is Releasing"} image={"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2Fapril-skateboards-nike-sb-dunk-low-release-info-1.jpg?q=90&w=1400&cbr=1&fit=max"}> {lorem} </Article>
      <Article  title={"Official Images of the Nike SB x Air Jordan 4 'Pine Green'"} image={"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F02%2Fnike-sb-air-jordan-4-pine-green-dr5415-103-release-info-000.jpg?fit=max&cbr=1&q=90&w=750&h=500"}> {lorem} </Article>
      <Article  title={"Nike Expands Its Jackie Robinson Catalog With This Air Force 1 Low Colorway"} image={"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F03%2Fnike-air-force-1-low-jackie-robinson-FN1868-100-release-date-0.jpg?fit=max&cbr=1&q=90&w=750&h=500"}> {lorem} </Article>

      <span className="flex gap-4 items-center h-12">
        <button onClick={()=>alert("Dead end")}className="flex justify-center items-center  h-8 border-stone-200 border-[1px] w-8 leading-8 bg-stone-800 rounded-lg  -scale-x-100 ">►</button>
        <span>1 <span className="font-bold">2</span> ... 8</span>
        <button onClick={()=>alert("Dead end")}className="flex justify-center items-center  h-8 border-stone-200 border-[1px] w-8 leading-8 bg-stone-800 rounded-lg  ">►</button>

      </span>

      </section>
      
    </div>
  );
};

export default News;
