import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Purchases() {
  const [purchase, setPurchase] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open state

   const navigate = useNavigate();


  console.log("Purchase", purchase);
  // logout function
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log("Login successful: ", res.data);
       toast.success(res.data.message);
      localStorage.removeItem("user");
      setLoggedIn(false);
      navigate("/login"); 
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.res.data);
         toast.error(error.res.data.errors || "Error in logging out");
        const errData = error.res.data.errors;

        if (Array.isArray(errData)) {
          setErrorMessage(errData.join(", "));
        } else if (typeof errData === "string") {
          setErrorMessage(errData); // handle single string
        } else {
          setErrorMessage("logout failed");
        }
      } else {
        console.error("Error:", error.message);
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // fetch purchased courses
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = storedUser ? JSON.parse(storedUser) : null; // token is directly stored
    const fetchPurchase = async () => {
      if (!token) {
        setErrorMessage("Please login to purchase the course");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/user/purchase",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setPurchase(response.data.courseData);
      } catch (error) {
       
        if (error?.response?.status === 400) {
          alert("You have already purchased this course");
        } else {
          setErrorMessage(
            "failed to fetch purchase data"
          );
        }
      }
    };
    fetchPurchase();
  }, []);



   // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (<div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {loggedIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-8 bg-gray-50 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">
          My Purchases
        </h2>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Render purchases */}
        {purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {purchase.map((purchase, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  {/* Course Image */}
                  <img
                    className="rounded-lg w-full h-48 object-cover"
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    }
                    alt={purchase.title}
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{purchase.title}</h3>
                    <p className="text-gray-500">
                      {purchase.description.length > 100
                        ? `${purchase.description.slice(0, 100)}...`
                        : purchase.description}
                    </p>
                    <span className="text-green-700 font-semibold text-sm">
                      ${purchase.price} only
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchases;
