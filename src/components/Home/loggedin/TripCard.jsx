import React from "react";
import { useNavigate } from "react-router-dom";
import beachimg from "../../../assets/beachimg.jpg";

export const TripCard = (props) => {
  const navigate = useNavigate();
  const viewTrip = () => {
    localStorage.setItem("tripId", props.trip.tripId);
    navigate(`/trip/`);
  };

  const { trip } = props;
  return (
    <div className="bg-white shadow-lg shadow-violet-300 rounded-lg py-4 inline-block mx-10 mt-3">
      <div className="bg-gradient-to-tr from-violet-400 via-violet-300 to-violet-400 rounded-t-lg shadow-lg shadow-violet-300">
        <h2 className="text-xl font-semibold mb-2">{trip.destination}</h2>
        <p className="text-gray-500 pb-">{trip.purpose}</p>
      </div>
      <img
        src={beachimg}
        alt="trip"
        className="w-[300px] px-0 shadow-lg mb-3"
      />
      <p className="text-gray-500 mb-2 text-md px-4">
        {new Date(trip.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" - "}
        {new Date(trip.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p
        className="cursor-pointer shadow-lg shadow-violet-700 px-4 py-2 bg-violet-500 w-fit rounded-lg mx-auto text-white hover:bg-violet-400 transition-all duration-500 ease-in-out"
        onClick={viewTrip}
      >
        Continue
      </p>
    </div>
  );
};
