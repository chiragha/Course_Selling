import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Courses from './components/Courses';
import Buy from './components/Buy';
import Purchases from './components/Purchases';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup/>}/>

      {/* after login routes  */}

      <Route path='/courses' element={<Courses />} />
      <Route path='/buy/:courseId' element={<Buy />} />
      <Route path='/purchase' element={<Purchases/>}/>

    </Routes>
  )
}

export default App
