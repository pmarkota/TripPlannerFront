import React from "react";

export const Hero = () => {
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <div>Hero</div>
      <button onClick={removeToken}>Log out</button>
    </>
  );
};
