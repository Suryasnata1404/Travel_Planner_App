import React from 'react'
import PlaceCardItem from './PlaceCardItem'

export default function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className="font-extrabold text-3xl text-center bg-gradient-to-r from-[#17aded] to-[#074751] bg-clip-text text-transparent mb-6 relative">
            Places to Visit
            <span className="block mx-auto mt-2 h-[3px] w-16 bg-[#073041] rounded-full"></span>
        </h2>

        <div>
            {trip.tripData?.itinerary?.map((item,dayIndex)=>(
                <div className='mt-5' key={dayIndex}>
                    <h2 className='font-medium text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((Place, placeIndex)=>(
                        
                        <div  className='my-2' key={placeIndex}>
                            <h2 className=' text-sm font-bold text-[#144d79]'>{Place.time}</h2>
                            <PlaceCardItem Place={Place} />
                        </div>

                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
