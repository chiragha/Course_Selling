import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  //  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4001/api/v1/user/logout", {
        withCredentials: true,
      });
      console.log("logout successful: ", res.data);
      alert(res.data.message);
      // Remove user from localStorage
    localStorage.removeItem("user");
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

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

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
      } catch (error) {
        console.log("error in fetch corses", error);
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="bg-gradient-to-b from-cyan-500 to-cyan-200
 text-shadow-indigo-500  min-h-screen"
    >
      <div className=" text-black container mx-auto">
        {/* header section  */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="img" className="h-10 w-10" />
            <h3 className="text-emerald-950 font-bold text-2xl">
              Course<span className="text-amber-500">HUB</span>
            </h3>
          </div>
          <div className="space-x-4">
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-amber-800 py-2 px-4 border border-amber-500 rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-amber-800 py-2 px-4 border border-amber-500 rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-amber-800 py-2 px-4 border border-amber-500 rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* main section  */}
        <section className="text-center py-20">
          <h3 className="text-emerald-950 font-bold text-4xl">
            Course<span className="text-amber-500">HUB</span>
          </h3>
          <p>
            Improve Your{" "}
            <span className="text-amber-950 font-bold">SKILLS</span> with us
          </p>

          <div className="space-x-4 mt-8">
            <Link
              to={"/courses"}
              className="bg-green-500 text-white duration-300  rounded font-semibold py-3 px-6 hover:bg-amber-300 hover:text-amber-950 cursor-pointer"
            >
              Explore Courses
            </Link>
            <button className="bg-cyan-700 text-white duration-300 rounded font-semibold py-3 px-6 hover:bg-amber-300 hover:text-amber-950 cursor-pointer">
              Explore Free Videos
            </button>
          </div>
        </section>
        <section className="p-10">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative flex-shrink-0 w-full p-4 transition-transform duration-300 transform hover:scale-105">
                  <div
                    className="bg-gradient-to-b from-cyan-400 to-cyan-100
              rounded-lg overflow-hidden"
                  >
                    <img
                      src={course.image?.url}
                      alt={course.title || ""}
                      className="w-full h-32 object-contain"
                    />

                    <div className="p-6 text-center">
                      <h3 className="font-semibold text-black">
                        {course.title}
                      </h3>
                      <button className="bg-green-500 text-gray-700 duration-300 rounded-2xl font-semibold p-2 hover:bg-amber-300 hover:text-amber-950 cursor-pointer">
                        Explore Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
        <hr />

        {/* footer section  */}
        <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img
                  src="/logo.png"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <h3 className="text-emerald-950 font-bold text-2xl">
                  Course<span className="text-amber-500">HUB</span>
                </h3>
              </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4"></div>
              </div>
            </div>

            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold md:mb-4">connects</h3>
              <ul className=" space-y-2 text-black text-1xl font-semibold">
                <li className="hover:text-white cursor-pointer duration-300">
                  youtube- coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  telegram- coding
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Github- coding
                </li>
              </ul>
            </div>
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              <h3 className="text-lg font-semibold mb-4">
                copyrights &#169; 2024
              </h3>
              <ul className=" space-y-2 text-center text-black text-1xl font-semibold">
                <li className="hover:text-white cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer duration-300">
                  Refund & Cancellation
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
