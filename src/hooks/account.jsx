import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLoggedIn = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return token;
};

export { useCheckLoggedIn };
