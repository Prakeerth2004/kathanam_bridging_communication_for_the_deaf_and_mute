import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {auth.currentUser?.displayName}!</h2>
      <p>Email: {auth.currentUser?.email}</p>
      <img src={auth.currentUser?.photoURL} alt="User Avatar" className="user-avatar" />
      <button className="btn btn-logout" onClick={handleLogout}>Logout</button>

      {/* Embedded CSS */}
      <style>{`
        .dashboard {
          text-align: center;
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .dashboard h2 {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .dashboard p {
          font-size: 1.2rem;
          color: #555;
        }

        .user-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-top: 10px;
        }

        .btn {
          margin: 10px;
          padding: 12px 20px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          width: 200px;
          font-weight: bold;
        }

        .btn-logout {
          background-color: #ff5f5f;
          color: white;
        }

        .btn-logout:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
