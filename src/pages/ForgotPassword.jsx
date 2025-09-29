import React, { useState } from 'react';

import axios from 'axios';
import {
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { serverUrl } from '../App';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Your project colors
  const primaryColor = "#6b21a8";
  const hoverColor = "#5a189a";
  const bgColor = "#6b21a8";
  const borderColor = "#807a7a";

  const handleSendOtp = async () => {
    if (!email) {
      setErr("Email is required");
      return;
    }
    
    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErr("OTP is required");
      return;
    }
    
    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      setErr(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErr("Both password fields are required");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 6) {
      setErr("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      console.log(result);
      alert("Password reset successfully!");
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IoIosArrowRoundBack 
            size={30} 
            className="cursor-pointer hover:opacity-70 transition" 
            style={{ color: primaryColor }}
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center" style={{ color: primaryColor }}>
            Forgot Password
          </h1>
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div>
            <p className="text-center mb-6 text-gray-600">
              Enter your email to receive a verification code
            </p>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                style={{ borderColor: borderColor }}
                placeholder="Enter your email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                required
              />
            </div>
            <button 
              className="w-full font-semibold py-3 rounded-lg transition duration-200 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: primaryColor }}
              onClick={handleSendOtp} 
              disabled={loading || !email}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send Verification Code"}
            </button>
            {err && <p className="text-red-500 text-center mt-4">* {err}</p>}
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div>
            <p className="text-center mb-6 text-gray-600">
              Enter the verification code sent to your email
            </p>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
                Verification Code
              </label>
              <input 
                type="text" 
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest"
                style={{ borderColor: borderColor }}
                placeholder="Enter 6-digit code" 
                onChange={(e) => setOtp(e.target.value)} 
                value={otp}
                maxLength={6}
                required
              />
            </div>
            <button 
              className="w-full font-semibold py-3 rounded-lg transition duration-200 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: primaryColor }}
              onClick={handleVerifyOtp} 
              disabled={loading || !otp}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify Code"}
            </button>
            {err && <p className="text-red-500 text-center mt-4">* {err}</p>}
            
            {/* Resend OTP option */}
            <p className="text-center mt-4 text-sm text-gray-600">
              Didn't receive the code?{" "}
              <span 
                className="cursor-pointer font-semibold hover:underline"
                style={{ color: primaryColor }}
                onClick={handleSendOtp}
              >
                Resend
              </span>
            </p>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div>
            <p className="text-center mb-6 text-gray-600">
              Create your new password
            </p>
            
            {/* New Password */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  style={{ borderColor: borderColor }}
                  placeholder="Enter new password" 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  value={newPassword}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                  style={{ borderColor: borderColor }}
                  placeholder="Confirm new password" 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  value={confirmPassword}
                  required
                />
                <button 
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            <button 
              className="w-full font-semibold py-3 rounded-lg transition duration-200 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: primaryColor }}
              onClick={handleResetPassword} 
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Reset Password"}
            </button>
            {err && <p className="text-red-500 text-center mt-4">* {err}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;