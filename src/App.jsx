/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./sites/Home";
import { Login } from "./sites/Login";
import { Register } from "./sites/Register";
import { Planatrip } from "./components/Home/loggedin/Planatrip";
import { Mytrips } from "./components/Home/loggedin/Mytrips";
import { Trip } from "./components/Home/loggedin/Trip";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/planatrip" element={<Planatrip />} />
          <Route path="/mytrips" element={<Mytrips />} />
          <Route path="/trip" element={<Trip />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
