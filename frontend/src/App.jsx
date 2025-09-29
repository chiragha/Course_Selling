import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Courses from "./components/Courses";
import Buy from "./components/Buy";
import Purchases from "./components/Purchases";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import CreateCourse from "./admin/CreateCourse";
import Dashboard from "./admin/Dashboard";
import OurCourses from "./admin/OurCourses";
import UpdateCourse from "./admin/UpdateCourse";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <Routes>
      {/* user login routes  */}

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* after user login routes  */}

      <Route path="/courses" element={<Courses />} />
      <Route path="/buy/:courseId" element={<Buy />} />
      <Route
        path="/purchase"
        element={user ? <Purchases /> : <Navigate to={"/login"} />}
      />

      {/* admin routes  */}
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/updateCourse/:courseId" element={<UpdateCourse />} />
      <Route path="/admin/createCourse" element={<CreateCourse />} />
      <Route
        path="/admin/dashboard"
        element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
      />
      <Route path="/admin/ourCourses" element={<OurCourses />} />
    </Routes>
  );
}

export default App;
