import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Firebase auth import
import { onAuthStateChanged, signOut } from "firebase/auth";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || "User");
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <Navbar
      expand="lg"
      style={{ background: "linear-gradient(to right, #f28500, #e98d3f)" }}
      className="px-4 py-2"
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo-Photoroom.png"
            alt="Kathanam Logo"
            height="40"
            className="me-3"
          />
          <span className="fw-bold text-white" style={{ fontSize: "22px" }}>
            KATHANAM
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* NAVIGATION LINKS */}
          <Nav className="mx-auto nav-links">
            <Nav.Link as={Link} to="/" className="nav-item">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" className="nav-item">
              Courses
            </Nav.Link>
            <Nav.Link as={Link} to="/careers" className="nav-item">
              Careers
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className="nav-item">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus" className="nav-item">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/autism" className="nav-item">
              Autism
            </Nav.Link>

            {/* ✅ Added Speech-to-Text and Translate */}
            <Nav.Link as={Link} to="/speech-to-text" className="nav-item">
              🎤 Speech to Text
            </Nav.Link>
            <Nav.Link as={Link} to="/translate" className="nav-item">
              🌍 Translate
            </Nav.Link>
          </Nav>

          {/* AUTHENTICATION BUTTONS */}
          {!isLoggedIn ? (
            <div className="d-flex">
              <Button
                as={Link}
                to="/login"
                variant="success"
                className="me-2 rounded-pill px-4 fw-bold"
                style={{ fontSize: "16px" }}
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/signup"
                className="rounded-pill px-4 fw-bold"
                style={{
                  fontSize: "16px",
                  backgroundColor: "#f4a261",
                  border: "none",
                  color: "white",
                }}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <NavDropdown
              title={
                <img
                  src="/default-profile.png"
                  alt="Profile"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
              }
              id="basic-nav-dropdown"
              align="end"
              className="dropdown-menu-right"
            >
              <NavDropdown.Item as={Link} to="/dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Container>

      {/* Embedded CSS */}
      <style>{`
        .nav-links .nav-item {
          position: relative;
          color: white !important;
          font-weight: 600;
          margin: 0 12px;
          font-size: 16px;
          transition: all 0.3s ease-in-out;
        }

        /* Underline Effect */
        .nav-links .nav-item::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -4px;
          width: 0;
          height: 3px;
          background-color: white;
          transition: all 0.3s ease-in-out;
          transform: translateX(-50%);
          border-radius: 5px;
        }

        /* Hover Effects */
        .nav-links .nav-item:hover::after {
          width: 100%;
        }

        .nav-links .nav-item:hover {
          opacity: 0.9;
        }

        /* Dropdown alignment */
        .dropdown-menu-right {
          right: 0;
          left: auto;
        }
      `}</style>
    </Navbar>
  );
};

export default CustomNavbar;
