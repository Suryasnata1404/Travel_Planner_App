import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
import MarqueeWrapper from '../Marquee';

function Hero() {

  const images = [
    { name: "India Gate", src: "/Hero/india.jpg" },
    { name: "Stone henge", src: "/Hero/stonehenge.jpg" },
    { name: "Statue of Liberty", src: "/Hero/liberty.jpg" },
    { name: "Eiffel Tower", src: "/Hero/Eiffel_Tower.jpg" },
    { name: "Udaipur", src: "/Hero/Udaipur.jpg" },
    { name: "sydney", src: "/Hero/sydney.jpg" },
    { name: "Machu Picchu", src: "/Hero/peru.jpg" },
    { name: "Taj Mahal", src: "/Hero/taj.webp" },
    { name: "Varanasi", src: "/Hero/Varanasi.jpg" },
    { name: "Chichen Itza", src: "/Hero/chichen.webp" },
    { name: "Colosseum", src: "/Hero/colosseum.jpg" },
  ];

  const firstHalf = images.slice(0, images.length / 2);
  const secondHalf = images.slice(images.length / 2);

  return (
    <div className='flex flex-col items-center mx-35 min-h-screen py-10 gap-8 px-6'>
        
        <h1 className='font-extrabold text-[45px] text-center mt-15'><span className='text-[#78d9f4]'>Discover Your Next Adventure with AI: </span>Personalized Itineraries at Your Fingertips</h1>
        
        <p className='text-xl text-gray-500 text-center '>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        
        <Link to={'/create-trip'}><Button>Get Started, It's Free</Button></Link>
        
        {/* <img src="/landing.png" alt="" className='w-[750px]' /> */}



         {/* 🖼️ Marquee Animation Section */}
      <div className="relative flex flex-col w-[90vw] md:w-[75vw] justify-center overflow-hidden mt-10">
        {/* Top row — moves right */}
        <MarqueeWrapper reverse pauseOnHover className="[--duration:20s]">
          {firstHalf.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.name}
              className="w-[200px] md:w-[250px]  rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
              loading="lazy"
              role="presentation"
            />
          ))}
        </MarqueeWrapper>

        {/* Bottom row — moves left */}
        <MarqueeWrapper pauseOnHover className="[--duration:20s]">
          {secondHalf.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.name}
              className="w-[200px] md:w-[250px]  rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
              loading="lazy"
              role="presentation"
            />
          ))}
        </MarqueeWrapper>


        {/* Gradient edges for smooth fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
      </div>
      
    </div>
  )
}

export default Hero
