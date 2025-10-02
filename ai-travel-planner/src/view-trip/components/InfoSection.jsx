import { Button } from '@/components/ui/button';
import { getPlaceImage } from '@/service/ImageApi';
import React, { useEffect, useState } from 'react'


function InfoSection({trip}) {

  const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (trip?.userSelection?.location) {
          fetchImageFromUnsplash(trip.userSelection.location);
        }
    }, [trip])

    const fetchImageFromUnsplash = async (placeName) => {
        const imageUrl = await getPlaceImage(placeName);
        setPhotoUrl(imageUrl);
    };


  return (
    <div>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="img"  className='h-[340px] w-full object-cover rounded-xl' />

        <div className='flex justify-between items-center'>
            <div className=' my-5 flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md '>📅{trip.userSelection?.noOfDays} Day</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>👥No. of traveler/s: {trip.userSelection?.traveler}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoSection