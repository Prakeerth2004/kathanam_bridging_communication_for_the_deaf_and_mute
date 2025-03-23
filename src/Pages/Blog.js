import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
  const stories = [
    {
      title: "Helen Keller: Overcoming Blindness & Deafness",
      description:
        "Helen Keller, despite being both deaf and blind, became an advocate for people with disabilities, an author, and a lecturer.",
    },
    {
      title: "Nyle DiMarco: Advocate for the Deaf Community",
      description:
        "Nyle DiMarco, winner of America's Next Top Model, is a proud deaf man who advocates for deaf culture.",
    },
    {
      title: "Marlee Matlin: Award-Winning Actress",
      description:
        "Marlee Matlin is a deaf actress who won an Academy Award for Best Actress for her role in 'Children of a Lesser God.'",
    },
    {
      title: "The Story of Sudha Chandran: A Dancer Overcoming Amputation",
      description:
        "Sudha Chandran lost her leg in an accident but became a famous Indian classical dancer, symbolizing resilience.",
    },
    {
      title: "Dr. V. Shantha: Breaking Barriers in Medicine",
      description:
        "Dr. V. Shantha was a pioneering oncologist who made groundbreaking contributions to cancer treatment.",
    },
    {
      title: "Pranav Deshpande: A Blind Runner",
      description:
        "Pranav Deshpande, a blind marathon runner from India, has completed multiple marathons, proving blindness is not a limitation.",
    },
  ];

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div
        className="blog-header text-center"
        style={{
          backgroundColor: "#f28500",
          color: "white",
          padding: "50px 0",
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
        }}
      >
        <h1 className="fw-bold">Inspiring Stories</h1>
        <p className="mt-2">Learn from ISL, ASL, & Autism Communities</p>
      </div>

      {/* Blog Stories */}
      <div className="row mt-5">
        {stories.map((story, index) => (
          <motion.div
            className="col-md-4 mb-4 d-flex align-items-stretch"
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="card shadow-lg"
              style={{
                border: "none",
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                overflow: "hidden",
              }}
            >
              {/* Blog Content */}
              <div className="card-body">
                <h5 className="card-title text-dark fw-bold">{story.title}</h5>
                <p className="card-text text-secondary">{story.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded CSS */}
      <style>{`
        .container {
          padding: 20px 15px;
        }

        .blog-header h1 {
          font-size: 2.5rem;
        }

        .blog-header p {
          font-size: 1.2rem;
          font-weight: 400;
        }

        .card-body h5 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .card-body p {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default Blog;
