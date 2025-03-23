import React from "react";

const islTeachers = [
  {
    name: "John Doe",
    subject: "Indian Sign Language (ISL)",
    specialization: "Literature & Grammar",
    designation: "Senior Professor",
    availableSlots: "Mon-Wed, 2 PM - 4 PM",
    image: "/images/johndoe.jpeg", // Replace with actual image path
  },
  {
    name: "Jane Smith",
    subject: "Indian Sign Language (ISL)",
    specialization: "Advanced Writing & Composition",
    designation: "Assistant Professor",
    availableSlots: "Thu-Fri, 3 PM - 5 PM",
    image: "/images/janesmith.jpeg", // Replace with actual image path
  },
];

const aslTeachers = [
  {
    name: "Ravi Kumar",
    subject: "American Sign Language (ASL)",
    specialization: "Literary Criticism & Poetry",
    designation: "Lecturer",
    availableSlots: "Mon-Fri, 10 AM - 12 PM",
    image: "/images/ravikumar.jpeg", // Replace with actual image path
  },
  {
    name: "Sita Reddy",
    subject: "American Sign Language (ASL)",
    specialization: "Modern ASL Literature",
    designation: "Lecturer",
    availableSlots: "Mon-Wed, 11 AM - 1 PM",
    image: "/images/sitareddy.jpeg", // Replace with actual image path
  },
];

const autismTeachers = [
  {
    name: "Amit Patel",
    subject: "Autism Communication",
    specialization: "Speech & Communication Skills",
    designation: "Assistant Professor",
    availableSlots: "Thu-Fri, 1 PM - 3 PM",
    image: "/images/amit.jpg", // Replace with actual image path
  },
  {
    name: "Priya Verma",
    subject: "Autism Communication",
    specialization: "Behavioral Therapy & Social Skills",
    designation: "Professor",
    availableSlots: "Mon-Tue, 2 PM - 4 PM",
    image: "/images/priya.jpg", // Replace with actual image path
  },
];

const Careers = () => {
  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#2A9D8F", // Full blue background
        minHeight: "100vh", // Ensure it covers the full height of the page
        padding: "50px 0", // Added padding for better spacing
      }}
    >
      <h2 className="text-center mb-5 text-white">Meet Our Expert Teachers</h2>

      {/* ISL Teachers */}
      <h4 className="text-center text-white mb-4">
        Indian Sign Language (ISL) Teachers
      </h4>
      <div className="row justify-content-center">
        {islTeachers.map((teacher, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg p-3" style={{ height: "400px" }}>
              <img
                src={teacher.image}
                alt={teacher.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark">{teacher.name}</h5>
                <p className="card-text">
                  <strong>Specialization:</strong> {teacher.specialization}{" "}
                  <br />
                  <strong>Designation:</strong> {teacher.designation} <br />
                  <strong>Available Slots:</strong> {teacher.availableSlots}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ASL Teachers */}
      <h4 className="text-center text-white mb-4">
        American Sign Language (ASL) Teachers
      </h4>
      <div className="row justify-content-center">
        {aslTeachers.map((teacher, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg p-3" style={{ height: "400px" }}>
              <img
                src={teacher.image}
                alt={teacher.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark">{teacher.name}</h5>
                <p className="card-text">
                  <strong>Specialization:</strong> {teacher.specialization}{" "}
                  <br />
                  <strong>Designation:</strong> {teacher.designation} <br />
                  <strong>Available Slots:</strong> {teacher.availableSlots}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Autism Teachers */}
      <h4 className="text-center text-white mb-4">
        Autism Communication Teachers
      </h4>
      <div className="row justify-content-center">
        {autismTeachers.map((teacher, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg p-3" style={{ height: "600px" }}>
              <img
                src={teacher.image}
                alt={teacher.name}
                className="card-img-top"
                style={{ height: "600px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark">{teacher.name}</h5>
                <p className="card-text">
                  <strong>Specialization:</strong> {teacher.specialization}{" "}
                  <br />
                  <strong>Designation:</strong> {teacher.designation} <br />
                  <strong>Available Slots:</strong> {teacher.availableSlots}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "Get Onboard with Us" Button */}
      <div className="text-center mt-3 mb-5">
        <a
          href="https://forms.gle/your-google-form-link" // Replace with actual Google Form link
          className="btn btn-light btn-lg"
          style={{
            padding: "12px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#F4A261", // Button color
            border: "none",
            borderRadius: "8px",
            marginTop: "20px", // Added margin-top to lift the button a bit
            fontWeight: "bold", // Make the text bold
            color: "white", // Change the text color to white
          }}
        >
          Get Onboard with Us
        </a>
      </div>
    </div>
  );
};

export default Careers;
