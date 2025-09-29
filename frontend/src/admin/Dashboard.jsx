import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


 
 function Dashboard() {

    const navigate = useNavigate(); 
  
  const handleLogout = async () => {
  try {
    const res = await axios.get("http://localhost:4001/api/v1/admin/logout", {
      withCredentials: true,
    });

    // Make sure res.data exists
    if (res && res.data && res.data.message) {
      alert(res.data.message);
    } else {
      alert("Logout successful");
    }

    // Remove token from localStorage
    localStorage.removeItem("admin");
     alert("Logout successful");
    navigate("/admin/login");
  } catch (error) {
    console.error("Logout error:", error);

    // Fallback error message
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    } else {
      alert("Logout failed. Please try again.");
    }

    // Remove token anyway to prevent stuck state
    localStorage.removeItem("admin");
    navigate("/admin/login");
  }
};


    

   return (
     <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <img src="/logo.png" alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/ourCourses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/createCourse">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
        Welcome!!!
      </div>
    </div>
   )
 }
 
 export default Dashboard
 