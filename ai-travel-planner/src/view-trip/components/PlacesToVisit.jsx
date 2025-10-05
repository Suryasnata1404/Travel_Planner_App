import React from 'react'
import PlaceCardItem from './PlaceCardItem'

export default function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {trip.tripData?.itinerary?.map((item,dayIndex)=>(
                <div className='mt-5' key={dayIndex}>
                    <h2 className='font-medium text-lg'>{item.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((Place, placeIndex)=>(
                        
                        <div  className='my-2' key={placeIndex}>
                            <h2 className='font-medium text-sm text-orange-600'>{Place.time}</h2>
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
