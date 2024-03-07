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
import { Activity } from "./components/Home/loggedin/Activity";
import { NewActivity } from "./components/Home/loggedin/NewActivity";
import { Budget } from "./components/Home/loggedin/Budget";
import { NewBudget } from "./components/Home/loggedin/NewBudget";
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
          <Route path="/activity" element={<Activity />} />
          <Route path="/newactivity" element={<NewActivity />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/newbudget" element={<NewBudget />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
