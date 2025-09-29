import React, { useState } from 'react';

import axios from 'axios';
import {
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'; 
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { serverUrl } from '../App';

function SignUp() {
  const primaryColor = "#6b21a8";
  const hoverColor = "#c1abd6";
  const bgColor = "#6b21a8";
  const borderColor = "#807a7a";

  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate(); // Uncommented navigate
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(''); // Added error state

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true);
    setError('');
    
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, {
        fullName,
        email,
        mobile,
        password
      }, { withCredentials: true });
      
      console.log(result.data);
      // Redirect or show success message
      alert('Sign up successful!');
      navigate('/signin'); // Redirect to sign in page
      
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSignInRedirect = () => {
    navigate('/signin'); // Navigate to sign in page


  }

   const handleGoogleAuth = async () => {
    if (!mobile) {
      return setErr("mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
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
          SignUp
        </h2>
        <p className="text-center mb-6" style={{ color: borderColor }}>
          Create a new account
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4" style={{ color: borderColor }}>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: borderColor }}
            placeholder="Enter your full name"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            required
          />
        </div>

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
        
        {/* Phone No */}
        <div className="mb-4" style={{ color: borderColor }}>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone No
          </label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{ borderColor: borderColor }}
            placeholder="Enter your phone number"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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

        {/* Sign Up Button */}
        <button
          className="w-full py-2 px-3 rounded text-white font-semibold mt-3 cursor-pointer hover:bg-[#c1abd6] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSignUp}
          style={{ backgroundColor: loading ? '#9ca3af' : primaryColor }}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Google Sign Up Button */}
        <button className='w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 transition duration-200 hover:bg-gray-50'
         onClick={handleGoogleAuth}>
          <FcGoogle />
          <span>Sign up with Google</span>
        </button>

        {/* Sign In Redirect */}
        <p className='text-center mt-4 cursor-pointer'>
          Already have an account?{' '}
          <span 
            className='text-[#6b21a8] font-semibold hover:underline'
            onClick={handleSignInRedirect}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;