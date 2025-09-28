import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

function Viewtrip() {
  const {tripId}=useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
      tripId && GetTripData()
  }, [tripId])

  // used to get trip info from firebase

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document: ",docSnap.data() )
        setTrip(docSnap.data());
    }

    else {
        console.log("No such document");
        toast("No trip found")
    }

  }

  return (
    <div>
      
    </div>
  )
}

export default Viewtrip   