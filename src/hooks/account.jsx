import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLoggedIn = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const loggedIn = token ? true : false;
  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn);
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return loggedIn;
};

export { useCheckLoggedIn };
