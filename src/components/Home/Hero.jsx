import React from "react";

export const Hero = () => {
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <div>Hero placeholder</div>
    </>
  );
};
