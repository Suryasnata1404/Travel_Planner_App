import { getPlaceImage } from '@/service/UnsplashApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl] = useState(null);
    
        useEffect(() => {
            if (hotel?.name) {
              fetchHotelImage();
            }
        }, [hotel]);
    
        const fetchHotelImage = async () => {
          try {
            const query = `${hotel.name} hotel`;
            const image = await getPlaceImage(query);
            setPhotoUrl(image);
          } catch (error) {
            console.error('Unsplash Hotel Image Error:', error);
            setPhotoUrl(null);
          }
        };


  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.name + ',' + hotel?.address)}`}
      target="_blank"
    >
            <div className="hover:scale-110 transition-all cursor-pointer mt-5 mb-8">
              <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="img" className="rounded-xl h-[180px] w-full object-cover" />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium ">{hotel?.name}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
                <h2 className="text-sm">💰 {hotel?.price}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
              </div>
            </div>
    </Link>
  )
}

export default HotelCardItem