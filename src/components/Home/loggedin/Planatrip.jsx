import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { NavBar } from "../../Navbar";

export const Planatrip = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const userId = localStorage.getItem("id");

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const apiUrl = import.meta.env.VITE_API_URL;
  //   useEffect(() => {
  //     console.log("startDate:", value.startDate);
  //     console.log("endDate:", value.endDate);
  //   }, [value]);
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toISOString();
    const year = newDate.slice(0, 4);
    const month = newDate.slice(5, 7);
    const day = newDate.slice(8, 10);
    return `${year}-${month}-${day}T00:00:00Z`;
  };

  const handlePostTrip = async () => {
    const purpose = document.getElementById("purpose").value;
    const destination = document.getElementById("destination").value;
    const startDate = changeDateFormat(value.startDate);
    const endDate = changeDateFormat(value.endDate);

    const tripData = {
      purpose,
      destination,
      startDate,
      endDate,
      userId,
    };
    const response = await fetch(`${apiUrl}trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });
    const data = await response.json();
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex flex-col items-center mt-8 shadow-lg shadow-violet-300 rounded-lg bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500  w-fit mx-auto px-6 py-10">
        <div className="w-80">
          <label htmlFor="purpose" className="text-gray-700 font-medium mb-2">
            Purpose
          </label>
          <input
            type="text"
            id="purpose"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-80 mt-4">
          <label
            htmlFor="destination"
            className="text-gray-700 font-medium mb-2"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-80 mt-4">
          <label htmlFor="date" className="text-gray-700 font-medium mb-2">
            Trip date
          </label>
          <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
          />
        </div>

        <p
          className="cursor-pointer shadow-lg shadow-violet-700 px-4 py-2 mt-3 bg-violet-500 w-fit rounded-lg mx-auto text-white hover:bg-violet-400 transition-all duration-500 ease-in-out"
          onClick={handlePostTrip}
        >
          Continue
        </p>
      </div>
    </>
  );
};
