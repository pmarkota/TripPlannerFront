import React, { useState, useEffect } from "react";
import { NavBar } from "../../Navbar";
import { useNavigate } from "react-router-dom";

export const Budget = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //get budgetid from local storage and turn it into a number
  const id = Number(localStorage.getItem("budgetId"));
  const tripId = localStorage.getItem("tripId");
  const [budget, setBudget] = useState({
    category: "",
    amount: "",
  });
  const navigate = useNavigate();

  const postGetBudgetById = async () => {
    const response = await fetch(`${apiUrl}budgets/id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ budgetId: id }),
    });
    const data = await response.json();
    setBudget(data);
  };

  const handleSaveBudget = async () => {
    const response = await fetch(`${apiUrl}budgets/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, tripId, ...budget }),
    });
    navigate(-1);
  };
  useEffect(() => {
    postGetBudgetById();
  }, [id]);

  useEffect(() => {
    document.title = `Budget | ${budget.category || "Loading..."}`;
  }, [budget.category]);

  const backgroundStyle = {
    background: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/architect.svg')`,
  };

  // Handler function to update activity name
  const handleCategoryChange = (e) => {
    setBudget({ ...budget, category: e.target.value });
  };

  // Handler function to update activity category
  const handleAmountChange = (e) => {
    setBudget({ ...budget, amount: e.target.value });
  };

  return (
    <>
      <NavBar />

      <div className="bg-gray-100 flex bg-local" style={backgroundStyle}>
        <div className="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Category*
                </label>
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="name"
                  type="text"
                  value={budget.category}
                  onChange={handleCategoryChange} //onkeydown enter to save
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveBudget();
                    }
                  }}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Amount*
                </label>
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="category"
                  type="text"
                  value={budget.amount}
                  onChange={handleAmountChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveBudget();
                    }
                  }} // Bind the onChange event
                />
              </div>
            </div>
          </div>
          <p
            className="text-gray-700 font-medium mb-2 pb-2 inline bg-red-300 rounded-lg px-4 py-2 cursor-pointer shadow-lg shadow-red-500 hover:bg-red-400 hover:shadow-red-400 transition-all duration-500 ease-in-out mr-10"
            onClick={() => navigate(-1)}
          >
            Go Back
          </p>
          <p
            className="text-gray-700 font-medium mb-2 pb-2 inline bg-yellow-300 rounded-lg px-4 py-2 cursor-pointer shadow-lg shadow-yellow-500 hover:bg-yellow-400 hover:shadow-yellow-400 transition-all duration-500 ease-in-out"
            onClick={() => handleSaveBudget()}
          >
            Save
          </p>
        </div>
      </div>
    </>
  );
};
