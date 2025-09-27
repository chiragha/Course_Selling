import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // for navigation 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:4001/api/v1/user/signup",
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Signup successful: ", res.data);
    alert(res.data.message);
    navigate("/login")
 } catch (error) {
  if (error.response) {
    console.error("Error response:", error.response.data);

    const errData = error.response.data.errors;

    if (Array.isArray(errData)) {
      setErrorMessage(errData.join(", "));
    } else if (typeof errData === "string") {
      setErrorMessage(errData); // handle single string
    } else {
      setErrorMessage("Signup failed");
    }
  } else {
    console.error("Error:", error.message);
    setErrorMessage("Network error. Please try again.");
  }
}


};


  return (
    <div className="bg-gradient-to-b from-cyan-500 to-cyan-200
 text-shadow-indigo-500  min-h-screen">
      <div className="h-screen flex  items-center justify-center text-white container mx-auto ">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
          <div className="flex items-center space-x-2">
           <img src='/logo.png' alt='img' className='h-10 w-10'/>
            <h3 className='text-emerald-950 font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/login"}
              className="bg-transparent border border-gray-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
            >
              Login
            </Link>
            <Link
              to={"/courses"}
              className="bg-orange-500 p-1 text-sm md:text-md md:py-2 md:px-4 rounded-md"
            >
              Join now
            </Link>
          </div>
        </header>

        {/* Signup Form */}
        <div className="bg-gradient-to-b from-cyan-400 to-cyan-100 p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
                      <h3 className='text-black font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
          <p className="text-center text-black mb-6">
            Just Signup To Join Us!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className=" black mb-2">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your firstname"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className=" text-black mb-2">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your lastname"
                required
              />
            </div>

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
           
              {/* error message  */}

              {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
           
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;