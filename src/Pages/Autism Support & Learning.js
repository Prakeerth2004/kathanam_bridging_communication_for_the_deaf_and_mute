import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

// Autism Experts Section (No Images)
const autismExperts = [
  {
    name: "Dr. Temple Grandin",
    role: "Autism Advocate & Speaker",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Tony Attwood",
    role: "Autism Specialist",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Dr. Stephen Shore",
    role: "Professor & Autism Speaker",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Donna Williams",
    role: "Author & Autism Researcher",
    linkedin: "https://www.linkedin.com",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

// Autism Educational Videos Section
const autismVideos = [
  { id: "Dl79ZADT0Zg", title: "Autism Learning Basics" },
  { id: "g7mQGSx5lwY", title: "How Autism Affects Children" },
  { id: "f69gCNnd2kc", title: "Autism Therapy Techniques" },
  { id: "saHivNPttPQ", title: "How to Help Autistic Kids Learn" },
  { id: "zEk48QQSPo4", title: "Understanding Autism Spectrum Disorder" },
  { id: "iNrVIIy0zLE", title: "Speech Therapy for Autism" },
  { id: "lUAE53N7lmU", title: "Early Signs of Autism in Kids" },
  { id: "clcTxWp9MHc", title: "Parenting an Autistic Child" },
  { id: "7pN6ydLE4EQ", title: "Autism-Friendly Activities" },
  { id: "ma9zueShW_o", title: "How to Communicate with an Autistic Child" },
];

const AutisticKids = () => {
  return (
    <div>
      {/* Banner Section */}
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center"
        style={{
          background: "linear-gradient(135deg, #264653, rgb(25, 145, 63))",
          padding: "60px 0",
          borderBottomLeftRadius: "80px",
          borderBottomRightRadius: "80px",
        }}
      >
        <motion.h2
          className="text-center text-white"
          style={{ fontWeight: "bold", fontSize: "2.5rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Autism Experts
        </motion.h2>
        <motion.p
          className="text-center text-white mt-3"
          style={{ fontSize: "1.2rem", maxWidth: "800px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A group of educators, researchers, and advocates dedicated to autism
          awareness and support.
        </motion.p>
      </div>

      {/* Experts Section (No Images) */}
      <div className="container mt-5">
        <div className="row">
          {autismExperts.map((expert, index) => (
            <motion.div
              key={index}
              className="col-md-3 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className="card shadow-lg text-center p-3"
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h5 className="mt-3 font-weight-bold">{expert.name}</h5>
                <p className="text-muted">{expert.role}</p>

                {/* Social Media Links */}
                <div className="d-flex justify-content-center mt-2">
                  <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="mx-2 text-primary">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={expert.github} target="_blank" rel="noopener noreferrer" className="mx-2 text-dark">
                    <FaGithub size={20} />
                  </a>
                  <a href={expert.twitter} target="_blank" rel="noopener noreferrer" className="mx-2 text-info">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Autism Educational Videos Section */}
      <div className="container mt-5">
        <motion.h2
          className="text-center"
          style={{ fontWeight: "bold", fontSize: "2.2rem", marginBottom: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Educational Videos for Autistic Kids
        </motion.h2>

        <div className="row">
          {autismVideos.map((video, index) => (
            <motion.div
              key={index}
              className="col-md-4 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="embed-responsive embed-responsive-16by9 shadow-lg"
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allowFullScreen
                />
              </div>
              <p className="text-center mt-2">{video.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div className="text-center mt-5">
        <motion.button
          className="btn btn-primary btn-lg"
          style={{ fontSize: "1.2rem" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Learn More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AutisticKids;
