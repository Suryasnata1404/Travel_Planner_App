import React, { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";

function CreateTrip() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    libraries: ["places"],
  });

  const [place, setPlace] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const placeObj = autocompleteRef.current.getPlace();
      console.log("Selected Place:", placeObj); // 👀 logs full Google Place object
      setPlace(placeObj);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10">
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="font-bold text-3xl">
            Tell us your travel preferences🏕️🌴
          </h2>
          <p className="mt-3 text-gray-500 text-xl">
            Just provide some basic information, and our trip planner will generate
            a customized itinerary based on your preferences.
          </p>

          <div className="mt-15 flex flex-col gap-10">
            <div>
              <h2 className="text-xl my-3 font-medium">
                What is destination of choice?
              </h2>
              <Autocomplete
                onLoad={(ac) => (autocompleteRef.current = ac)}
                onPlaceChanged={handlePlaceChanged}
              >
                <Input
                  type="text"
                  placeholder="Enter a destination"
                  className="w-full p-3 border rounded-lg"
                />
              </Autocomplete>
            </div>
          
            <div>
              <h2 className="text-xl my-3 font-medium">
                How many days are you planning your trip?
              </h2>
              <Input placeholder={"Ex.4"} type="number" />
            </div>

            <div>
              <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border cursor-pointer rounded-lg hover:shadow-lg"
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item, index) => (
                  <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-lg '>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>  
          </div>

          <div className='my-10 justify-end flex'> 
            <Button>Generate Trip</Button> 
          </div>
        </>
      )}  
     </div>
  );
}

export default CreateTrip;
