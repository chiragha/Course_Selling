import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Buy() {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"));

  const handlePurchase = async () => {
    if (!token) {
      alert("Please login to purchase the course");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4001/api/v1/course/buy/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course Purchased Successfully!");
      setLoading(false);
      navigate("/purchase");
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 400) {
        toast.success("You have already purchased this course");
        navigate("/purchase");
      } else {
        console.error("Purchase failed:", error?.response?.data || error.message);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const [form, setForm] = useState({ name: "", cardNumber: "", expiry: "", cvv: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert("Payment Successful ✅"); };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/api/v1/course/${courseId}`);
        setCourse(res.data.course); // adjust if your API returns differently
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
    fetchCourse();
  }, [courseId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        
        {/* Course title & price */}
        {course && (
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              You are buying: {course.title}
            </h3>
            <p className="text-indigo-700 font-bold text-xl mt-1">₹{course.price}</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Payment Details</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name on Card */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name on Card</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Expiry + CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-600 font-medium mb-1">Expiry</label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-600 font-medium mb-1">CVV</label>
              <input
                type="password"
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                maxLength={3}
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
            </div>
          </div>

          {/* Amount Summary */}
          <div className="flex justify-between items-center text-lg font-semibold text-gray-800 border-t pt-4">
            <span>Total Amount</span>
            <span className="text-indigo-600">{course ? `₹${course.price}` : "Loading..."}</span>
          </div>

          {/* Pay Button */}
          <button
            type="button"
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Buy;
