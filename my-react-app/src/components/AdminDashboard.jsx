import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin-login'); // Redirect to login if not authenticated
    }

    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submissions', {
          headers: { Authorization: token }
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  return (
    <div className="container">
      <h2>User Submissions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Uploaded Images</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.socialMediaHandle}</td>
              <td>
                {submission.images.map((image, imgIndex) => (
                  <img 
                    key={imgIndex} 
                    src={`http://localhost:5000/${image}`} // Ensure correct URL to access images
                    alt={`Submission ${imgIndex}`} 
                    style={{ width: '50px', height: '50px', marginRight: '5px' }} 
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
