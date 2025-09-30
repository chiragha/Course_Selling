import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { BACKEND_URL } from "../utils/utils";
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ password });
   try {
  const response = await axios.post(
    "http://localhost:4001/api/v1/admin/login",
    { email, password },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  console.log("AdminLogin successful: ", response.data);
  toast.success(response.data.message);

  // store token/info first
  localStorage.setItem("admin", JSON.stringify({ token: response.data.token }));

  // then navigate
  navigate("/admin/dashboard");

} catch (error) {
  if (error.response) {
    setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
  }
}

  };

  return (
    <div className="bg-gradient-to-b from-cyan-500 to-cyan-200
 text-shadow-indigo-500  min-h-screen">
      <div className="h-screen container mx-auto flex  items-center justify-center text-white">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
           <div className="flex items-center space-x-2">
           <img src='/logo.png' alt='img' className='h-10 w-10'/>
            <h3 className='text-emerald-950 font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/admin/signup"}
              className="bg-transparent border border-gray-500 py-2 px-4 rounded-md"
            >
              Signup
            </Link>
            <Link
              to={"/courses"}
              className="bg-orange-500 py-2 px-4 rounded-md"
            >
              Join now
            </Link>
          </div>
        </header>

        {/* AdminLogin Form */}
         <div className="bg-gradient-to-b from-cyan-400 to-cyan-100 p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
                      <h3 className='text-black font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
          <p className="text-center text-black mb-6">
            Just Login To Join Us!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
             <label htmlFor="email" className=" text-black mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;