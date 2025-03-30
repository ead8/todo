// src/components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaClipboardList } from 'react-icons/fa';
import useStore from '../store';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Use the login action from the Zustand store
        await login(email, password);
        navigate('/');
      } else {
        // Use the register action from the Zustand store
        await register(username, email, password);
        setIsLogin(true);
        setError('Registration successful! Please log in.');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for the form
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation for the toggle text
  const toggleVariants = {
    hover: { scale: 1.05, color: '#f7f7f7' },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <FaClipboardList className="text-4xl text-pink-400" />
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Login to TODO' : 'Register for TODO'}
        </h1>

        {/* Error Message */}
        {error && (
          <motion.div
            className={`text-center p-2 mb-4 rounded ${
              isLogin && error.includes('successful')
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Username Field (only for Register) */}
          {!isLogin && (
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : isLogin ? (
              'Login'
            ) : (
              'Register'
            )}
          </motion.button>
        </form>

        {/* Toggle between Login and Register */}
        <motion.p
          className="text-center text-gray-400 mt-4 cursor-pointer"
          variants={toggleVariants}
          whileHover="hover"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
          }}
        >
          {isLogin ? "Don't have an account? Register!" : 'Already have an account? Login!'}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Auth;