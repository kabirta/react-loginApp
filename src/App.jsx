import React from 'react';

import {
  Route,
  Routes,
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export const serverUrl = " https://react-loginapp-backend.onrender.com";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default App;
