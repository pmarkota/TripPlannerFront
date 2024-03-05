import React, { useEffect, useState } from "react";
import { NavBar } from "../../Navbar";
import { useParams } from "react-router-dom";

export const Trip = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("id");
  const tripId = localStorage.getItem("tripId");
  const [trip, setTrip] = useState({});

  const postGetTripById = async () => {
    //post request to get trip by id
    const response = await fetch(`${apiUrl}trips/getbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId, userId }),
    });
    const data = await response.json();
    console.log(data);
    setTrip(data);
  };
  useEffect(() => {
    console.log(tripId);
    postGetTripById();
  }, [tripId]);

  const formatDate = (dateString) => {
    // Create a new Date object from the dateString
    const date = new Date(dateString);

    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary

    // Return the formatted date string in the desired format
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-col items-center mt-8 bg-slate-50 w-fit rounded-lg shadow-2xl shadow-blue-800 mr-auto px-6 py-10">
        <div className="w-80">
          <h1 className="text-2xl font-medium mb-2">{trip.purpose}</h1>
          <p className="text-gray-700 font-medium mb-2">
            Destination: {trip.destination}
          </p>
          <p className="text-gray-700 font-medium mb-2">
            From: {formatDate(trip.startDate)}
          </p>
          <p className="text-gray-700 font-medium mb-2">
            To: {formatDate(trip.endDate)}
          </p>
        </div>
      </div>
    </>
  );
};
