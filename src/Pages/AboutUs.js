import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const AboutUs = () => {
  const teamMembers = [
  /*{ name: "Aryan Sharma", role: "Developer", img: "/images/aryan.jpg" },*/
    { name: "Nakul Limbani", role: "Developer", img: "/images/nakul.jpg" },
    { name: "Shiv Rastogi", role: "Developer", img: "/images/shiv.jpg" },
    { name: "Varun Gadi", role: "Developer", img: "/images/varun.jpg" },
    /*{ name: "Palak Seth", role: "Developer", img: "/images/palak.jpg" },
    { name: "Ritika Vyas", role: "Developer", img: "/images/ritika.jpg" },
    { name: "Yash Gupta", role: "Developer", img: "/images/yash.jpg" },*/
    { name: "Prakeerth Gollapati", role: "Developer", img: "/images/prakeerth.jpg" },
  ];

  return (
    <div className="about-us-page">
      {/* Curved Header */}
      <div className="curved-bg">
        <h1 className="text-center text-white">Meet Our Team</h1>
        <p className="text-center text-white subtitle">
          A group of passionate individuals building something extraordinary.
        </p>
      </div>

      {/* Team Section */}
      <div className="container team-container">
        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col
              md={4}
              lg={3}
              className="mb-4"
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <Card className="team-card shadow">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  className="team-img"
                />
                <Card.Body className="text-center">
                  <Card.Title className="text-dark fw-bold">
                    {member.name}
                  </Card.Title>
                  <Card.Text className="text-dark mb-3">{member.role}</Card.Text>
                  <div className="social-icons d-flex justify-content-center gap-3">
                    <a href="#" className="text-primary">
                      <FaLinkedin />
                    </a>
                    <a href="#" className="text-dark">
                      <FaGithub />
                    </a>
                    <a href="#" className="text-info">
                      <FaTwitter />
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Embedded CSS */}
      <style>{`
        /* Curved Header Styling */
        .curved-bg {
          position: relative;
          background: linear-gradient(to right, #f28500, #e98d3f);
          height: 250px;
          border-bottom-left-radius: 50% 15%;
          border-bottom-right-radius: 50% 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .curved-bg h1 {
          font-size: 2.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
          font-size: 1.1rem;
          font-weight: 400;
          margin-top: 10px;
        }

        /* Team Container */
        .team-container {
          margin-top: 50px; /* Add spacing to prevent overlap */
          padding: 20px;
        }

        /* Team Cards */
        .team-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
        }

        .team-img {
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }

        .social-icons a {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .social-icons a:hover {
          transform: scale(1.2);
        }

        /* Responsive Styling */
        @media (max-width: 768px) {
          .curved-bg {
            height: 220px;
          }

          .curved-bg h1 {
            font-size: 1.8rem;
          }

          .subtitle {
            font-size: 0.9rem;
          }

          .team-container {
            margin-top: 70px; /* Increase margin for smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
