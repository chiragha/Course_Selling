import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; 
import { Link, useNavigate } from "react-router-dom";

function Courses() {

   const [courses, setCourses] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
  
console.log("courses",courses)
    // logout function 
    const handleLogout = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/v1/user/logout", {
          withCredentials: true,
        });
        console.log("Login successful: ", res.data);
        alert(res.data.message);
        setLoggedIn(false);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
  
          const errData = error.response.data.errors;
  
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
  
    // fetch courses 
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4001/api/v1/course/courses",
            {
              withCredential: true,
            }
          );
  
          console.log(res.data);
          setCourses(res.data.courses);
          setLoading(false)
        } catch (error) {
          console.log("error in fetch corses", error);
        }
      };
      fetchCourses();
    }, []);
  
  return (
    <div className="flex">
      {/* Hamburger menu button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
      >
        button
      </button>

      {/* Sidebar */}
      <aside
        className="">
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src="/logo.png" alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchase" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {loggedIn ? (
                <Link to={"/"}
                  
                  className="flex items-center"
                  onClick={handleLogout}
                >
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to={"/login"} className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-0 md:ml-64 w-full bg-white p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-bold">Courses</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type here to search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none"
              />
              <button className="h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>

            <FaCircleUser className="text-4xl text-blue-600" />
          </div>
        </header>

        {/* Vertically Scrollable Courses Section */}
        <div className="overflow-y-auto h-[75vh]">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            // Check if courses array is empty
            <p className="text-center text-gray-500">
              No course posted yet by admin
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="rounded mb-4"
                  />
                  <h2 className="font-bold text-lg mb-2">{course.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-xl">
                      ₹{course.price}{" "}
                      <span className="text-gray-500 line-through">5999</span>
                    </span>
                    <span className="text-green-600">20% off</span>
                  </div>

                  {/* Buy page */}
                  <Link
                    to={`/buy/${course._id}`} // Pass courseId in URL
                    className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses
