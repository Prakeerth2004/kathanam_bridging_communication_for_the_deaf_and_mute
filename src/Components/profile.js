import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email"); // Fetch logged-in user's email

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:5000/profile/${email}`).then((res) => {
        setUser(res.data.user);
      });
    }
  }, [email]);

  return (
    <div>
      <h2>My Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
