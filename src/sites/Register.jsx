import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenDecoder } from "../utils/tokenDecoder";

export const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  useEffect(() => {
    document.title = "Register";
    if (loggedIn) {
      navigate("/");
    }
    document.getElementById("root").style.setProperty("padding", "0px");
  }, [loggedIn, navigate]);

  const postRegisterData = async (email, username, password) => {
    const response = await fetch(`${apiUrl}appusers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    const decoded = tokenDecoder(data.token);
    localStorage.setItem("userId", decoded.id);
    setLoggedIn(true);

    return data;
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-violet-300 via-fuchsia-500 to-yellow-500">
        <form className="bg-white shadow-lg shadow-violet-300 rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Emai
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  postRegisterData(email, username, password);
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  postRegisterData(email, username, password);
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
                  postRegisterData(email, username, password);
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="cursor-pointer shadow-lg mr-10 shadow-cyan-700 px-4 py-2 mt-3 bg-cyan-500 w-fit rounded-lg mx-auto text-white hover:bg-cyan-400 transition-all duration-500 ease-in-out"
              type="button"
              onClick={async () => {
                navigate("/login");
              }}
            >
              Go To Login
            </button>
            <button
              className="cursor-pointer shadow-lg shadow-violet-700 px-4 py-2 mt-3 bg-violet-500 w-fit rounded-lg mx-auto text-white hover:bg-violet-400 transition-all duration-500 ease-in-out"
              type="button"
              onClick={async () => {
                const data = await postRegisterData(email, username, password);
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
