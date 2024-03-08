import React, { useEffect } from "react";
import { Hero } from "../components/Home/Hero";
import { NavBar } from "../components/Navbar";
import { useCheckLoggedIn } from "../hooks/account";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  useEffect(() => {
    document.title = "Home";
    document.getElementById("root").style.setProperty("padding", "2rem");
  }, []);
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
};
