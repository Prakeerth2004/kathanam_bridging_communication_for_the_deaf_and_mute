import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center">
        {/* Use /logo.png from public folder */}
        <img src="/logo.png" alt="Kathanam Logo" className="footer-logo" />
        <h5 className="brand-name">KATHANAM</h5>

        {/* Newsletter Subscription */}
        <p>Subscribe to get our Newsletter</p>
        <div className="newsletter">
          <input type="email" className="form-control" placeholder="Your Email" />
          <button className="btn btn-subscribe">Subscribe</button>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <a href="#">Careers</a> | 
          <a href="#"> Privacy Policy</a> | 
          <a href="#"> Terms & Conditions</a>
        </div>

        {/* Copyright */}
        <p className="copyright">© 2025 Kathanam Inc.</p>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .footer {
          background-color: #0d3b21;
          color: white;
          padding: 40px 0;
          text-align: center;
        }

        .footer-logo {
          width: 50px;
          height: 50px;
          margin-bottom: 10px;
        }

        .brand-name {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .newsletter {
          display: flex;
          justify-content: center;
          gap: 10px;
          max-width: 400px;
          margin: 15px auto;
        }

        .newsletter input {
          flex: 1;
          padding: 10px;
          border-radius: 25px;
          border: none;
          outline: none;
        }

        .btn-subscribe {
          background: #40c9a2;
          color: white;
          border-radius: 25px;
          padding: 10px 20px;
          font-weight: bold;
          border: none;
        }

        .footer-links {
          margin-top: 15px;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          margin: 0 10px;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        .copyright {
          margin-top: 15px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
