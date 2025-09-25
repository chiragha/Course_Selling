import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import React from "react";
import Slider from "react-slick";

function Home() {

      useEffect(() => {
         const fetchCourses = async() => {
        try {
           const res = await axios.get("http://localhost:4001/api/v1/course/courses")
           console.log(res.data)
        } catch (error) {
            console.log("error in fetch corses", error)
        }
    };
    fetchCourses();
      },[])

  return (
    <div className='bg-gradient-to-r from-cyan-400 text-shadow-indigo-500'>
     <div className='h-screen text-black container m-auto'>

      {/* header section  */}
      <header className='flex items-center justify-between p-6'>
        <div className='flex items-center space-x-2'>
            <img src='/logo.png' alt='img' className='h-10 w-10'/>
            <h3 className='text-emerald-950 font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
        </div>
        <div className='space-x-4'>
            <Link to={"/login"} className='bg-transparent text-amber-800 py-2 px-4 border border-amber-500 rounded'>Login</Link>
            <Link to={"/signup"} className='bg-transparent text-amber-800 py-2 px-4 border border-amber-500 rounded'>Signup</Link>
        </div>
      </header>



      {/* main section  */}
      <section className='text-center py-20'>
        <h3 className='text-emerald-950 font-bold text-4xl'>Course<span className='text-amber-500'>HUB</span></h3>
         <p>Improve Your <span className='text-amber-950 font-bold'>SKILLS</span> with us</p>
        
        <div className='space-x-4 mt-8'>
             <button className='bg-green-500 text-white duration-300  rounded font-semibold py-3 px-6 hover:bg-amber-300 hover:text-amber-950 cursor-pointer'>Explore Courses</button>
         <button className='bg-cyan-700 text-white duration-300 rounded font-semibold py-3 px-6 hover:bg-amber-300 hover:text-amber-950 cursor-pointer'>Explore Free Videos</button>
        </div>
      
      </section>
       <section>
        
      </section>
  <hr/>
      
      {/* footer section  */}
       <footer className="my-12">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img src="/logo.png" alt="" className="w-10 h-10 rounded-full" />
                   <h3 className='text-emerald-950 font-bold text-2xl'>Course<span className='text-amber-500'>HUB</span></h3>
                </div>
              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                 
                </div>
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
  )
}

export default Home
