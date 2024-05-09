import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterPage.css'; // Import custom CSS file for styling

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        Password: '',
        Email: '',
        PhoneNumber: '',
        ProfilePicture: null,
        Role: ''
    });

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('FirstName', formData.FirstName);
        data.append('LastName', formData.LastName);
        data.append('UserName', formData.UserName);
        data.append('Password', formData.Password);
        data.append('Email', formData.Email);
        data.append('PhoneNumber', formData.PhoneNumber);
        data.append('ProfilePicture', formData.ProfilePicture);
        data.append('Role', formData.Role);

        try {
            await axios.post('https://localhost:7274/api/Auth/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Handle successful registration
            toast.success('Registration successful!');
            console.log('Registration successful!');
        } catch (error) {
            // Handle error response
            console.error(error);
            setError(error.response.data);
            toast.error('Registration failed!');
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, ProfilePicture: e.target.files[0] });
    };

    const handleRoleChange = (e) => {
        setFormData({ ...formData, Role: e.target.value });
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={formData.FirstName} onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={formData.LastName} onChange={(e) => setFormData({ ...formData, LastName: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={formData.UserName} onChange={(e) => setFormData({ ...formData, UserName: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={formData.Password} onChange={(e) => setFormData({ ...formData, Password: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={formData.Email} onChange={(e) => setFormData({ ...formData, Email: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={formData.PhoneNumber} onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })} />
                </div>
                <div className="form-group">
                    <label>Profile Picture:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select value={formData.Role} onChange={handleRoleChange}>
                        <option value="">Select a role</option>
                        <option value="Admins">Admin</option>
                        <option value="Blogger">Blogger</option>
                        <option value="Surfer">Surfer</option>
                    </select>
                </div>
                <button type="submit">Register</button>
                {error && (
                    <div className="error-message">
                        <h3>Error:</h3>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                )}
            </form>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
