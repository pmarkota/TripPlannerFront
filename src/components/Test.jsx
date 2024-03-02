/* eslint-disable no-unused-vars */
import React from "react";

export const Test = () => {
  var apiUrl = import.meta.env.VITE_API_URL;
  const fetchData = async () => {
    const response = await fetch(apiUrl + "AppUsers");
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <button onClick={fetchData}>Click me</button>
    </>
  );
};
