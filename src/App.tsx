import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from './Context/UseAuth';

function App() {
  return (
    <>
    <UserProvider>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </UserProvider>
    </>
  );
}

export default App;
