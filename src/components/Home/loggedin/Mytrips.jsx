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
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div>
        {trips.map((trip) => (
          <TripCard trip={trip} key={trip.tripId}></TripCard>
        ))}
      </div>
    </>
  );
};
