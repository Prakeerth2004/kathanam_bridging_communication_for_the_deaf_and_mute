import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // **TEMPORARY DUMMY DATA FOR TESTING**
    const dummyUser = {
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Student",
      gender: "Male",
      dob: "1998-05-12",
      location: "New York, USA",
    };

    setTimeout(() => {
      setUserData(dummyUser);
      setFormData(dummyUser);
      setLoading(false);
    }, 1000); // Simulating an API delay
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUserData(formData); // Update local state with new data
    setEditing(false); // Exit editing mode
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading profile...</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {userData ? (
        <div className="profile-card">
          {!editing ? (
            <>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Role:</strong> {userData.role}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Date of Birth:</strong> {userData.dob}</p>
              <p><strong>Location:</strong> {userData.location}</p>
              <button className="edit-btn" onClick={handleEditToggle}>
                <FaEdit /> Edit Profile
              </button>
            </>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} disabled />
              </div>
              <div className="form-group">
                <label>Role:</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
            </div>
          )}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      {/* Embedded CSS */}
      <style>{`
        .profile-container {
          max-width: 600px;
          margin: 30px auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .profile-title {
          text-align: center;
          color: #2A9D8F;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .profile-card {
          text-align: left;
        }

        .profile-card p {
          font-size: 1rem;
          margin-bottom: 10px;
        }

        .edit-btn, .save-btn, .cancel-btn {
          margin-top: 15px;
          display: inline-block;
          padding: 10px 15px;
          font-size: 1rem;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background 0.3s;
        }

        .edit-btn {
          background: #2A9D8F;
          color: white;
        }

        .edit-btn:hover {
          background: #21867a;
        }

        .save-btn {
          background: #28a745;
          color: white;
        }

        .save-btn:hover {
          background: #218838;
        }

        .cancel-btn {
          background: #dc3545;
          color: white;
        }

        .cancel-btn:hover {
          background: #c82333;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
