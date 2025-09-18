import React, { useState, useEffect, useRef } from "react";
import { Autocomplete , useJsApiLoader } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateTravelPlan } from "@/service/AIModel";

const LIBRARIES = ["places"];

function CreateTrip() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    libraries: LIBRARIES,
  });

  const [place, setPlace] = useState(null);
  const autocompleteRef = useRef(null);
  const [formData, setFormData] = useState({});


  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  };

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  const onGenerateTrip = async () => {
    if(formData?.noOfDays>30 || !formData?.location || !formData?.budget || !formData?.traveler)
      
    {
      toast("Please fill all details.");
      return ;
    }
    
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)
      
    //console.log(FINAL_PROMPT);
    


    const result = await generateTravelPlan(FINAL_PROMPT);
    //console.log(result?.response?.text());
    

  }

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
                onLoad={(ref) => (autocompleteRef.current = ref)}
                onPlaceChanged={() => {
                  if (autocompleteRef.current) {
                    const place = autocompleteRef.current.getPlace();
                    setPlace(place);
                    handleInputChange("location", place.formatted_address || place.name);

                    // ✅ Debugging: Log full place object & address
                    console.log("Selected Place:", place);
                    console.log("Address:", place.formatted_address || place.name);
                  }
                }}
              >
                <Input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter a destination"
                  className="w-full p-3 border rounded-lg"
                />
              </Autocomplete>  
            </div>


            {/* Trip Duration */}
            <div>
              <h2 className="text-xl my-3 font-medium">
                How many days are you planning your trip?
              </h2>
              <Input placeholder={"Ex.4"} 
                type="number" 
                min="1"
                max="30"
                value={formData.noOfDays || ""}
                onKeyDown={(e) => {
                  // Block invalid keys
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  handleInputChange("noOfDays",e.target.value);
                }}
                className={`w-full p-3 border rounded-lg ${
                  formData.noOfDays && (formData.noOfDays < 1 || formData.noOfDays > 30)
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
                
              {formData.noOfDays && (formData.noOfDays < 1 || formData.noOfDays > 30) && (
      
                <p className="text-red-500 text-sm mt-1">
                  Please enter between 1 and 30 days.
                </p>
              )}
            </div>

            {/* Budget */}  
            <div>
              <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                      ${formData?.budget === item.title && "shadow-lg border-black"}
                    `}
                  >
                    <h2 className="text-4xl">{item.icon}</h2>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <h2 className="text-sm text-gray-500">{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Companions */}
            <div>
              <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleInputChange("traveler", item.people)}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                      ${formData?.traveler === item.people && "shadow-lg border-black"}
                    `}
                  >
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>  
          </div>

          <div className='my-10 justify-end flex'> 
            <Button onClick={onGenerateTrip}>Generate Trip</Button> 
          </div>
          
        </>
      )}  
     </div>
  );
}

export default CreateTrip;
