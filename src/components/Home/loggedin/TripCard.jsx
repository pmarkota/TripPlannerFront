import React from "react";

export const TripCard = (props) => {
  const { trip } = props;
  console.log(trip);
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 inline-block mx-10 mt-3">
      <h2 className="text-xl font-semibold mb-2">{trip.destination}</h2>
      <p className="text-gray-500 mb-2">{trip.purpose}</p>
      <p className="text-gray-500 mb-2">
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
    </div>
  );
};
