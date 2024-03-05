/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Home } from "./sites/Home";
import { Login } from "./sites/Login";
import { Register } from "./sites/Register";
import { Planatrip } from "./components/Home/loggedin/Planatrip";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
