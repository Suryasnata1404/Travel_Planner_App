import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { generateTravelPlan } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getPlaceSuggestions } from "@/service/PlacesApi";

function CreateTrip() {

  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  };

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const delay = setTimeout(() => {
    if (query.length >= 3) handleSearch(query);
  }, 400);
  return () => clearTimeout(delay);
}, [query]);


  // ✅ Geoapify search
  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    const results = await getPlaceSuggestions(value);
    setSuggestions(results);
  };

  const handleSelectSuggestion = (place) => {
    const label = place.properties.formatted;
    setQuery(label);
    setSuggestions([]);
    handleInputChange("location", label);
    console.log("Selected Geoapify Place:", place);
  };

  //Generate AI Trip
  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }


    if(formData?.noOfDays>30 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return ;
    }
    setLoading(true);

    try {
      const result = await generateTravelPlan(
        formData?.location?.label || formData?.location,
        formData?.noOfDays,
        formData?.traveler,
        formData?.budget
      );

      console.log("AI Response:", result); // ✅ already a JS object

      if (!result) {
        toast.error("Failed to generate trip. Please try again.");
        return;
      }

      await SaveAiTrip(result); // ✅ send parsed object directly
    } catch (err) {
      console.error("Error generating trip:", err);
      toast.error("Something went wrong while generating trip.");
    } finally {
      setLoading(false);
    }
  };

  //Save to Firestore
  const SaveAiTrip = async(TripData) =>{
     
    setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.email) {
        toast.error("User not logged in. Please login again.");
        return;
      }

      const docId = Date.now().toString();

      // Add a new document in collection "AITrips"
      try {
        await setDoc(doc(db, "AITrips", docId), {
          userSelection: formData,
          tripData: TripData, // ✅ keep it as object
          userEmail: user?.email,
          id: docId
        });
        toast.success("Trip saved successfully!");
      } catch (error) {
        console.error("Firestore save error:", error);
        toast.error("Failed to save trip. Try again.");
      }
      
      setLoading(false);
      navigate('/view-trip/'+docId)
  
  };

  //Google login
  const login= useGoogleLogin({
    onSuccess:(Response)=>GetUserProfile(Response),
    onError:(error)=> {
      toast.error("Google login failed. Please try again.");
      console.error(error);
    }
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:`Application/json`
      }
    }).then((resp) =>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    <>
    {pageLoading ? (
      <p className="text-center mt-20 text-[#1cacef] animate-pulse text-xl font-semibold">
          Loading your adventure...
        </p>
    ) : (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 mt-10 mb-20">
          <h2 className="font-extrabold text-4xl text-center text-[#1b485c] drop-shadow-sm">
            Plan Your Dream Trip with AI ✈️
          </h2>

        <p className="mt-4 text-gray-500 text-lg text-center max-w-2xl mx-auto leading-relaxed">
            Just share your travel vibes, and GoTravel will craft a smart,
            personalized itinerary — built around your interests and budget.
          </p>

          <div className="mt-15 flex flex-col gap-10">
            <div>
              <h2 className="text-xl my-3 font-medium">
                🌍 Where do you want to go?
              </h2>
              <div className="relative">
              <Input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter a destination"
                className="w-full p-3 border rounded-lg"
              />

              {suggestions.length > 0 && (
                <ul className="absolute bg-white border w-full rounded-lg mt-1 max-h-60 overflow-auto shadow-lg z-10">
                  {suggestions.map((sug) => (
                    <li
                      key={sug.properties.place_id}
                      onClick={() => handleSelectSuggestion(sug)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {sug.properties.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            </div>


            {/* Trip Duration */}
            <div>
              <h2 className="text-xl my-3 font-medium">
                📅 How many days are you planning your trip?
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
                  handleInputChange("noOfDays",Number(e.target.value));
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
              <h2 className="text-xl my-3 font-medium">💰 What’s your travel budget?</h2>
              <div className="grid grid-cols-3 gap-5 mt-5">
                {SelectBudgetOptions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={`p-4 border cursor-pointer rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-[#f0fbff] ${
                      formData?.budget === item.title &&
                      "shadow-lg border-[#0ba5e9] bg-[#e0f7ff]"
                    }`}
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
              <h2 className='text-xl my-3 font-medium'>🧭 Who do you plan on traveling with on your next adventure?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelList.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() =>
                      handleInputChange("traveler", item.people)
                    }
                    className={`p-4 border cursor-pointer rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-[#f0fbff] ${
                      formData?.traveler === item.people &&
                      "shadow-lg border-[#0ba5e9] bg-[#e0f7ff]"
                    }`}
                  >
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>  
          </div>

          {/* Generate Button */}
          <div className="my-12 justify-end flex">
            <Button
              onClick={onGenerateTrip}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-[#219fd5] to-[#14a5b8] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
                  <p>Generating...</p>
                </div>
              ) : (
                "Generate My Trip"
              )}
            </Button>
          </div>
          
          {/* Login Dialog */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            
            <DialogContent>
              <DialogHeader>
                <DialogDescription className="text-center">
                  <img src="/logo.png" alt="logo" width="65px" className="mx-auto mb-2" />
                  <h2 className='font-bold text-lg'>Sign In to check out your travel plan</h2>
                  <h2 className="font-bold text-lg text-[#0f8fa0]">
                    Sign In to unlock your travel plan ✨
                  </h2>
                  <p className="text-gray-500">
                    Securely sign in with Google to save and view your trips.
                  </p>
                  <Button
                    onClick={login}
                    className="w-full mt-5 flex gap-4 items-center justify-center bg-white border hover:bg-[#f7f9fa] text-gray-700"
                  >
                    <FcGoogle className="h-6 w-6" />
                    Sign In with Google
                  </Button>

                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
 
     </div>
    )}
  </> 
  );
}

export default CreateTrip;
