// import React from 'react'
// import { Autocomplete, useJsApiLoader  } from '@react-google-maps/api'

// function CreateTrip() {

//   const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
//   libraries: ["places"],
//   });

// if (!isLoaded) return <p>Loading...</p>;

//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 px-5 mt-10'>
//         <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️🌴</h2>
//         <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
    
//       <div className='mt-15 flex flex-col gap-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
//           <Autocomplete>
//               <input
//                 type="text"
//                 placeholder="Enter a destination"
//                 className="w-full p-3 border rounded-lg"
//               />
//           </Autocomplete>

//         </div>
        
//       </div>  

//     </div>
//   )
// }

// export default CreateTrip

import React, { useState, useEffect } from "react";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounce search (runs 400ms after typing stops)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://photon.komoot.io/api/?q=${query}&limit=5`)
          .then((res) => res.json())
          .then((data) => setResults(data.features || []))
          .catch((err) => console.error("Error fetching places:", err));
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.properties.name || "");
    setResults([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary.
      </p>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a destination"
          className="w-full p-3 border rounded-lg"
        />

        {results.length > 0 && (
          <ul className="border rounded-lg mt-2 bg-white shadow-lg max-h-60 overflow-y-auto">
            {results.map((place, idx) => (
              <li
                key={idx}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(place)}
              >
                {place.properties.name}
                {place.properties.city ? `, ${place.properties.city}` : ""}
                {place.properties.country ? ` (${place.properties.country})` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CreateTrip;
