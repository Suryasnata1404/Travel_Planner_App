import { getPlaceImage } from '@/service/UnsplashApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) fetchImage();
  }, [trip])

  const fetchImage = async () => {
    try {
      const location = trip?.userSelection?.location;
      if (!location) return;

      const imageUrl = await getPlaceImage(location);
      setPhotoUrl(url);
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
        <div className='hover:scale-105 transition-all'>
            <img src={photoUrl ? photoUrl : '/placeholder.jpg'} alt="img" className='object-cover rounded-xl h-[220px]' />
            <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget. </h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCardItem