import React, { useState } from 'react';

import axios from 'axios';
import {
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

import { serverUrl } from '../App';

function SignIn() {
  const primaryColor = "#6b21a8";
  const hoverColor = "#c1abd6";
  const bgColor = "#6b21a8";
  const borderColor = "#807a7a";

  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password
      }, { withCredentials: true });
      
      console.log(result.data);
      alert('Sign in successful!');
      navigate('/dashboard');
      
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Sign in failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  const handleSignUpRedirect = () => {
    navigate('/signup');
  }

  // Updated forgot password function
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  }
   const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: primaryColor }}
        >
          Welcome Back
        </h2>
        <p className="text-center mb-6" style={{ color: borderColor }}>
          Sign in to your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4" style={{ color: borderColor }}>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: borderColor }}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4" style={{ color: borderColor }}>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">  
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              style={{ borderColor: borderColor }}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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

        {/* Forgot Password - Updated */}
        <div className="flex justify-end mb-4">
          <span 
            className="text-sm cursor-pointer hover:underline font-semibold"
            style={{ color: primaryColor }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </span>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full py-2 px-3 rounded text-white font-semibold mt-3 cursor-pointer hover:bg-[#c1abd6] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignIn}
          style={{ backgroundColor: loading ? '#9ca3af' : primaryColor }}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign In Button */}
        <button className='w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 transition duration-200 hover:bg-gray-50'
         onClick={handleGoogleAuth}>
          <FcGoogle />
          <span>Sign in with Google</span>
        </button>

        {/* Sign Up Redirect */}
        <p className='text-center mt-4 cursor-pointer'>
          Don't have an account?{' '}
          <span 
            className='text-[#6b21a8] font-semibold hover:underline'
            onClick={handleSignUpRedirect}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;