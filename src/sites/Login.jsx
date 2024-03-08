import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenDecoder } from "../utils/tokenDecoder";

export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  useEffect(() => {
    document.title = "Login";
    if (loggedIn) {
      console.log(loggedIn);
      navigate("/");
    }
    document.getElementById("root").style.setProperty("padding", "0px");
  }, [loggedIn, navigate]);

  const postLoginData = async (username, password) => {
    const response = await fetch(`${apiUrl}appusers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    const decoded = tokenDecoder(data.token);
    localStorage.setItem("id", decoded.id);
    setLoggedIn(true);

    console.log(response.status, data);
    return data;
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 m-0 p-0">
        <form className="bg-white shadow-lg shadow-violet-300 rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  postLoginData(username, password);
                }
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  postLoginData(username, password);
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="cursor-pointer shadow-lg mr-10 shadow-cyan-700 px-4 py-2 mt-3 bg-cyan-500 w-fit rounded-lg mx-auto text-white hover:bg-cyan-400 transition-all duration-500 ease-in-out"
              type="button"
              onClick={async () => {
                navigate("/register");
              }}
            >
              Go to Register
            </button>
            <button
              className="cursor-pointer shadow-lg shadow-violet-700 px-4 py-2 mt-3 bg-violet-500 w-fit rounded-lg mx-auto text-white hover:bg-violet-400 transition-all duration-500 ease-in-out"
              type="button"
              onClick={async () => {
                const data = await postLoginData(username, password);
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
