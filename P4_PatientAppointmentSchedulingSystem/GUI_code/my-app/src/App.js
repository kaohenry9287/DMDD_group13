import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Navbar';
import PatientPage from './PatientPage';
import InsurancePage from './InsurancePage';
import HospitalPage from './HospitalPage';
import DepartmentPage from './DepartmentPage';
import DoctorPage from './DoctorPage';
import HolidayPage from './HolidayPage';
import AppointmentPage from './AppointmentPage';
import ReportPage from './ReportPage';
import PrescriptionPage from './PrescriptionPage';
import BillingPage from './BillingPage';
import TestPage from './TestPage';
import RoomPage from './RoomPage';
import HomePage from './HomePage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import './App.css'; 
import homepage from './homepage.jpg';

// Import other pages

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    {/* <img src={homepage} alt="Hospital Banner" style={{ width: '100%', height: 'auto' }} /> */}
    <Routes>
        <Route path="/" element={<HomePage />}/> 
        <Route path="/patient" element={<PatientPage />}/>  
        <Route path="/insurance" element={<InsurancePage />}/>  
        <Route path="/hospital" element={<HospitalPage />}/>
        <Route path="/department" element={<DepartmentPage />}/>  
        <Route path="/doctor" element={<DoctorPage />}/>  
        <Route path="/holiday" element={<HolidayPage />}/> 
        <Route path="/appointment" element={<AppointmentPage />}/>  
        <Route path="/report" element={<ReportPage />}/>  
        <Route path="/prescription" element={<PrescriptionPage />}/>  
        <Route path="/billing" element={<BillingPage />}/>  
        <Route path="/test" element={<TestPage />}/>  
        <Route path="/room" element={<RoomPage />}/>  

    </Routes>
    </BrowserRouter>
  );
};

export default App;
