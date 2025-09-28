import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({Place}) {
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query=" +Place?.place} target="_blank" >
        <div  className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
            <img src='/placeholder.jpg'
            className='w-[130px] h-[130px] rounded-xl object-cover'
            />
            <div>
                <h2 className='font-bold text-lg'>{Place.place}</h2>
                <p className='text-sm text-gray-500'>{Place.details}</p>
                <h2 className='mt-2'>🕓{Place.best_time_to_visit}</h2>
                <h2 className='text-xs font-medium mt-2 mb-2'>🏷️Ticket: {Place.ticket_pricing}</h2>
                {/* <Button><FaMapLocationDot /></Button> */}
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem