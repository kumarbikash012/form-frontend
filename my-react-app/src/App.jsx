import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

const UserSubmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    socialMediaHandle: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = new FormData();
    submissionData.append('name', formData.name);
    submissionData.append('socialMediaHandle', formData.socialMediaHandle);
    formData.images.forEach((image) => {
      submissionData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/submit', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        socialMediaHandle: '',
        images: []
      });
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/admin-login'); 
  };


  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Submission Form</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin-login">Admin Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <div className="container-fluid vh-150">
              <div className="card shadow p-5" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="text-center mb-4">User Submission Form</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="socialMediaHandle" className="form-label">Social Media Handle:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="socialMediaHandle"
                      name="socialMediaHandle"
                      value={formData.socialMediaHandle}
                      onChange={handleInputChange}
                      placeholder="Enter your social media handle"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">Upload Images:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          } 
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default UserSubmissionForm;
