import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Course Categories
const categories = [
  {
    id: "isl",
    title: "Indian Sign Language (ISL)",
    image: "/images/isl_image.png",
    description:
      "Indian Sign Language (ISL) is used by the deaf community in India. Learn hand gestures and expressions that are crucial for communication.",
  },
  {
    id: "asl",
    title: "American Sign Language (ASL)",
    image: "/images/asl_image.jpeg",
    description:
      "American Sign Language (ASL) is the primary sign language of the United States. Learn essential signs for communication and conversation.",
  },
  {
    id: "autistic",
    title: "Autistic Communication",
    image: "/images/autistic.jpeg",
    description:
      "Autistic communication focuses on supporting individuals with autism through various communication techniques and strategies.",
  },
];

const Courses = () => {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #264653, #2A9D8F)",
        minHeight: "100vh",
        padding: "50px 0",
      }}
    >
      <h2
        className="text-center text-white"
        style={{
          textShadow: "3px 3px 10px rgba(0, 0, 0, 0.5)",
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        Select a Course Category
      </h2>

      <div className="row w-75 mt-4">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 mb-4">
            <Link
              to={`/level-selection/${category.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card shadow-sm p-3 text-center"
                style={{
                  borderRadius: "15px",
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "transparent",
                }}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="img-fluid"
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="text-white mt-3">{category.title}</h5>
                <p className="text-white">{category.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
