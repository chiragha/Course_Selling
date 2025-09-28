import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Buy() {
  const [loading, setLoading] = useState(false);
  const {courseId} = useParams();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"))
  // const token = user.token;

  const handlePurchase = async () => {
    if(!token){
      alert("Please login to purchase the course")
      return
    }
    try {
      setLoading(true);
      const response =await axios.post(`http://localhost:4001/api/v1/course/buy/${courseId}`,{},{
        headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials:true,
    }
      )
      alert(response.data.message || "Course Purchased Successfully!")
       setLoading(false);
       navigate("/purchase");
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 400) {
        alert("You have already purchased this course");
        navigate("/purchase");
      } else {
        console.error("Purchase failed:", error?.response?.data || error.message);
        alert(error?.response?.data?.message || "Something went wrong");
      }
    }
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <button className=' bg-blue-500 text-white py-2 px-2 cursor-pointer rounded-md hover:bg-indigo-600 transition duration-200' onClick={handlePurchase} disabled={loading}>{loading ? "Processing..." : "Buy Now"}</button>
    </div>
  )
}

export default Buy
