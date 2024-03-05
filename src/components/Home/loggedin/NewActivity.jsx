import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../Navbar";

export const NewActivity = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  //get tripId from localstorage and turn it into number
  const tripId = Number(localStorage.getItem("tripId"));
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    category: "",
    description: "",
  });
  const backgroundStyle = {
    background: `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/architect.svg')`,
  };

  useEffect(() => {
    document.title = "New Activity";
  }, []);
  const handleNameChange = (e) => {
    setActivity({ ...activity, name: e.target.value });
  };

  // Handler function to update activity category
  const handleCategoryChange = (e) => {
    setActivity({ ...activity, category: e.target.value });
  };

  // Handler function to update activity description
  const handleDescriptionChange = (e) => {
    setActivity({ ...activity, description: e.target.value });
  };

  const handleAddActivity = async () => {
    const response = await fetch(`${apiUrl}activities/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripId, ...activity }),
    });
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    navigate(-1);
  };
  return (
    <>
      <NavBar></NavBar>

      <div className="bg-gray-100 flex bg-local" style={backgroundStyle}>
        <div className="bg-gray-100 mx-auto max-w-6xl bg-white py-20 px-12 lg:px-24 shadow-xl mb-24">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name*
                </label>
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="name"
                  type="text"
                  value={activity.name}
                  onChange={handleNameChange} // Bind the onChange event
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Category*
                </label>
                <input
                  className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="category"
                  type="text"
                  value={activity.category}
                  onChange={handleCategoryChange} // Bind the onChange event
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="uppercase tracking-wide text-black text-xs font-bold mb-2"
                  htmlFor="description"
                >
                  Description*
                </label>
                <textarea
                  className="w-full h-32 bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                  id="description"
                  value={activity.description}
                  onChange={handleDescriptionChange} // Bind the onChange event
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
            onClick={() => handleAddActivity()}
          >
            Save
          </p>
        </div>
      </div>
    </>
  );
};
