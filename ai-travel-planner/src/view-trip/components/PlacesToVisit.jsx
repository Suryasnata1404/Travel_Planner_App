import React from 'react'

export default function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <div>
            {trip.tripData?.itinerary?.map((item,index)=>(
                <div>
                    <h2 className='font-medium text-lg'>Day {item.day}</h2>
                    {item.plan.map((visitPlace,index)=>(
                        
                        <div  className='my-2'>
                            <h2 className='font-medium text-sm text-orange-600'>{visitPlace.time}</h2>
                            <h2>{visitPlace.place}</h2>
                        </div>

                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}
