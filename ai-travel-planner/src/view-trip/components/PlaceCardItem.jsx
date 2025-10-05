import { Button } from '@/components/ui/button'
import { getPlaceImage } from '@/service/UnsplashApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function PlaceCardItem({Place}) {

  const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (Place?.place) {
            fetchPlaceImage();
        }   
    }, [Place])

    const fetchPlaceImage = async () => {
        try {
        // ✅ Using place name for Unsplash search
        const query = `${Place.place} tourist attraction`;
        const image = await getPlaceImage(query);
        setPhotoUrl(image);
        } catch (error) {
        console.error("Unsplash Place Image Error:", error);
        setPhotoUrl(null);
        }
    };
    

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        Place?.place
      )}`}
      target="_blank"
    >
        <div  className='shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
            <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="img" 
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