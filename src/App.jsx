// src/App.jsx
import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./components/Home";
import RegisterDoctor from "./components/RegisteDoctorForm";
import RegisterPatient from "./components/RegisterPatientForm";
import MyRecords from "./components/MyRecords";
import ActiveDoctorList from './components/ActiveDoctorList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-doctor" element={<RegisterDoctor />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/my-records" element={<MyRecords />} />
          <Route path="/active-doctors" element={<ActiveDoctorList />} />
          
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;