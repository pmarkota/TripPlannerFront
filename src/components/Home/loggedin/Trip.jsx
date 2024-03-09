import React, { useEffect, useState } from "react";
import { NavBar } from "../../Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Trip = (props) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("id");
  const tripId = localStorage.getItem("tripId");
  const [trip, setTrip] = useState({});
  const [activities, setActivities] = useState([]); // Add activities state
  const [budgets, setBudgets] = useState([]); // Add budgets state
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const postGetTripById = async () => {
    //post request to get trip by id
    const response = await fetch(`${apiUrl}trips/getbyid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId, userId }),
    });
    const data = await response.json();
    setTrip(data);
    setIsLoading(false); // Set loading state to false after trip data is fetched
  };

  const postGetBudgetsForTrip = async () => {
    //post request to get budgets for trip
    const response = await fetch(`${apiUrl}budgets/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId }),
    });
    const data = await response.json();
    setBudgets(data);
  };
  const postGetActivitiesForTrip = async () => {
    //post request to get activities for trip
    const response = await fetch(`${apiUrl}activities/trip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId }),
    });
    const data = await response.json();
    setActivities(data);
  };
  useEffect(() => {
    postGetTripById();
    postGetActivitiesForTrip();
    postGetBudgetsForTrip();
  }, [tripId]);

  useEffect(() => {
    document.title = isLoading
      ? "Loading..."
      : `Trip | ${trip.purpose || "Loading..."}`;
  }, [isLoading, trip.purpose]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    // Create a new Date object from the dateString
    const date = new Date(dateString);

    // Extract year, month, and day from the date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary

    // Return the formatted date string in the desired format
    return `${year}-${month}-${day}`;
  };

  const handleViewBudget = (budgetId) => {
    // Navigate to the AddBudget page
    localStorage.setItem("budgetId", budgetId);
    navigate(`/budget`);
  };

  const allToUpper = (string) => {
    return string ? string.toUpperCase() : ""; // Check if string is defined before calling toUpperCase()
  };

  const handleViewActivity = (activityId) => {
    // Navigate to the AddActivity page
    localStorage.setItem("activityId", activityId);
    // console.log("handleviewactivity");
    navigate(`/activity/`);
  };

  return (
    <>
      <NavBar></NavBar>
      <h1>{}</h1>
      <div className="flex justify-between">
        <div className="flex flex-col items-center mt-8 bg-slate-50 w-fit rounded-2xl shadow-xl shadow-violet-300  px-0 py-0">
          <div className="w-80">
            <div className="bg-violet-300 rounded-t-lg shadow-lg shadow-violet-400">
              <h1 className="text-2xl font-medium mb-2">
                {allToUpper(trip.purpose)}
              </h1>
              <p className="text-gray-700 font-medium mb-2 pb-2">
                Destination: {trip.destination}
              </p>
            </div>
            <p className="text-gray-700 font-medium mb-2 mt-4">
              From: {formatDate(trip.startDate)}
            </p>
            <p className="text-gray-700 font-medium mb-4">
              To: {formatDate(trip.endDate)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 bg-slate-50 w-fit rounded-lg shadow-2xl shadow-yellow-200 ring-1 ring-yellow-100  px-2 pb-2 pb-4">
          <div className="w-80">
            <div className="bg-yellow-300 rounded-t-lg shadow-lg shadow-yellow-400 mb-3">
              <h1 className="text-2xl font-medium mb-2">ACTIVITIES</h1>
              <p className="text-gray-700 font-medium mb-2 pb-2">
                Current activities for your trip
              </p>
            </div>
            {activities.map((activity) => (
              <div
                key={activity.activityId}
                className="bg-yellow-200 rounded-lg shadow-lg shadow-yellow-300 mb-3 flex justify-between px-4 pt-3
                "
              >
                <h1 className="text-md font-medium mt-1 inline-block mr-10">
                  {activity.name}
                </h1>
                <p
                  className="text-gray-700 font-medium mb-2 pb-2 inline bg-yellow-300 rounded-lg px-4 py-2 cursor-pointer shadow-lg shadow-yellow-500 hover:bg-yellow-400 hover:shadow-yellow-400 transition-all duration-500 ease-in-out"
                  onClick={() => handleViewActivity(activity.activityId)}
                >
                  View
                </p>
              </div>
            ))}
            <p
              className="cursor-pointer py-2 px-4 w-fit bg-yellow-500 hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-700 transition-all duration-500 ease-in-out shadow-yellow-600 shadow-lg mx-auto rounded-lg mt-6 text-white"
              onClick={() => navigate("/newactivity")}
            >
              Add Activity
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-8 bg-slate-50 w-fit rounded-lg shadow-2xl shadow-blue-200 ring-1 ring-blue-100  px-2 pb-2 pb-4">
          <div className="w-80">
            <div className="bg-blue-300 rounded-t-lg shadow-lg shadow-blue-400 mb-3">
              <h1 className="text-2xl font-medium mb-2">BUDGET</h1>
              <p className="text-gray-700 font-medium mb-2 pb-2">
                Planned budgets for your trip
              </p>
            </div>
            {budgets.map((budgets) => (
              <div
                key={budgets.budgetId}
                className="bg-blue-200 rounded-lg shadow-lg shadow-blue-300 mb-3 flex justify-between px-4 pt-3
                "
              >
                <h1 className="text-md font-medium mt-1 inline-block mr-10">
                  {budgets.category}
                </h1>
                <p
                  className="text-gray-700 font-medium mb-2 pb-2 inline bg-blue-300 rounded-lg px-4 py-2 cursor-pointer shadow-lg shadow-blue-500 hover:bg-blue-400 hover:shadow-blue-400 transition-all duration-500 ease-in-out"
                  onClick={() => handleViewBudget(budgets.budgetId)}
                >
                  View
                </p>
              </div>
            ))}
            <p
              className="cursor-pointer py-2 px-4 w-fit bg-blue-500 hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-700 transition-all duration-500 ease-in-out shadow-blue-600 shadow-lg mx-auto rounded-lg mt-6 text-white"
              onClick={() => navigate("/newbudget")}
            >
              Add Budget
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
