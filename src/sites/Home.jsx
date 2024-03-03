import React, { useEffect } from "react";
import { Hero } from "../components/Home/Hero";
import { useCheckLoggedIn } from "../hooks/account";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const isLoggedIn = useCheckLoggedIn();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      <Hero />
    </>
  );
};
