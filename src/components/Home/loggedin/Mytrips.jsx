import React, { useState, useEffect } from "react";
import { NavBar } from "../../Navbar";
import { TripCard } from "./TripCard";

export const Mytrips = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [trips, setTrips] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetch(`${apiUrl}trips/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setTrips(data);
      });
    document.title = "My Trips";
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div>
        {trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          trips.map((trip) => (
            <TripCard trip={trip} key={trip.tripId}></TripCard>
          ))
        )}
      </div>
    </>
  );
};
