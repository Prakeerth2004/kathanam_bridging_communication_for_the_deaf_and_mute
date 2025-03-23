import React from "react";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Text & Buttons */}
          <div className="col-lg-6 col-md-12 text-left">
            <h1>
              <span className="text-green">Studying</span> Online is now <br />
              much easier
            </h1>
            <p className="lead">Welcome Back! <br /> Glad to see you, Again!</p>

            {/* CTA Buttons */}
            <div className="d-flex align-items-center gap-3 mt-3">
              <a href="#" className="btn join-btn">Join for free</a>
              <a href="#" className="watch-link">
                <span className="play-icon">▶</span> Watch how it works
              </a>
            </div>
          </div>

          {/* Right Side - Logo & Floating Cards */}
          <div className="col-lg-6 col-md-12 position-relative text-center">
            {/* Your Logo (Replaces Placeholder) */}
            <img src="/logo-Photoroom.png" alt="Kathanam Logo" className="hero-logo" />

            {/* Floating Cards */}
            <div className="floating-card card-1">
              <span className="icon">📊</span>
              <p><strong>250k</strong> Assisted Students</p>
            </div>

            <div className="floating-card card-2">
              <span className="icon">🎉</span>
              <p><strong>Congratulations</strong> <br /> Your Registration Completed</p>
            </div>

            <div className="floating-card card-3">
              <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
              <p><strong>User Experience Videos</strong> <br /> Today at 12:00 PM</p>
              <a href="#" className="btn join-now-btn">Join Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curved Shape */}
      <div className="bottom-curve"></div>

      {/* Embedded CSS */}
      <style>{`
        /* Hero Section */
        .hero-section {
          background: linear-gradient(to right, #e6761b, #db6d17);
          padding: 100px 0 50px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        /* Headings & Text */
        .hero-section h1 {
          font-size: 3.5rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .text-green {
          color: #198754;
        }

        .lead {
          font-size: 1.4rem;
          margin-top: 10px;
        }

        /* Buttons */
        .join-btn {
          background-color: #f8c794;
          color: black;
          padding: 12px 25px;
          border-radius: 25px;
          font-weight: bold;
          text-decoration: none;
        }

        .watch-link {
          display: flex;
          align-items: center;
          color: white;
          font-weight: bold;
          text-decoration: none;
        }

        .play-icon {
          background-color: white;
          color: black;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 10px;
          font-size: 1.2rem;
        }

        /* Right Side Logo */
        .hero-logo {
          width: 320px;
          height: 320px;
          object-fit: contain;
          margin-top: 20px;
        }

        /* Floating Cards */
        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 1); /* Fully opaque white */
          color: #333; /* Dark text for visibility */
          font-weight: bold; /* Ensure text is readable */
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Stronger shadow */
          text-align: center;
          font-size: 1rem;
          min-width: 200px;
        }

        .floating-card p {
          margin: 0;
          font-size: 1rem;
          color: #333; /* Ensure contrast */
        }

        .floating-card strong {
          color: #000; /* Make numbers and headings bolder */
        }

        /* Adjust Floating Card Positions */
        .card-1 {
          top: 15%;
          left: 10%;
        }

        .card-2 {
          top: 40%;
          right: 10%;
        }

        .card-3 {
          bottom: 10%;
          left: 15%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
        }

        /* Floating Card Avatar */
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        /* Fix Join Now Button */
        .join-now-btn {
          background-color: #d63384;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
        }

        /* Bottom Curve */
        .bottom-curve {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 80px;
          background: white;
          border-top-left-radius: 50% 80px;
          border-top-right-radius: 50% 80px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-section {
            text-align: center;
            padding-bottom: 80px;
          }

          .hero-section h1 {
            font-size: 2.8rem;
          }

          .floating-card {
            position: static;
            margin: 10px auto;
          }

          .floating-card.card-3 {
            flex-direction: column;
            text-align: center;
          }

          .hero-logo {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
