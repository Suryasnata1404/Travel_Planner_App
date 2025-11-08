import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      
        <h2 className="font-extrabold text-3xl text-center bg-gradient-to-r from-[#17aded] to-[#074751] bg-clip-text text-transparent mb-6 relative">
            Hotel Recommendation
            <span className="block mx-auto mt-2 h-[3px] w-16 bg-[#073041] rounded-full"></span>
        </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl-grid-cols-4 gap-5">
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
            <HotelCardItem hotel={hotel}  key={hotel.id || index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
