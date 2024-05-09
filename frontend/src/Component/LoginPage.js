import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import LoginImage from '../../Assest/img/LoginPage.png';
// import Navbar from '../Navbar';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7274/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast.success('Login successful!'); // Use toast.success for success notification
        navigate('/Homepage');
      } else {
        toast.error('Invalid credentials! Please check your username and password.'); // Use toast.error for error notification
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.'); // Use toast.error for error notification
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer/>
      <div className="bg-white h-screen flex flex-col items-center justify-center p-30">
        <div className="bg-nav-gray w-96 p-6 rounded-lg shadow-md">
          <div className="flex justify-center">
            {/* <img src={LoginImage} alt="Login" width="100" height="100" className="rounded-full shadow-md mb-6" /> */}
          </div>
          <h1 className="text-3xl font-medium text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control" // Bootstrap form control class
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" // Bootstrap form control class
              />
            </div>
            <div className="flex justify-between my-4">
              <a href="#forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary w-full"> {/* Bootstrap button classes */}
              Login
            </button>
            <div className="flex justify-between my-4">
              <a href="/register" className="text-sm text-blue-600 hover:underline">
                Click here if you don't have an account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
