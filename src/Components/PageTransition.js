import React from "react";
import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start Animation
      animate={{ opacity: 1, y: 0 }} // End Animation
      exit={{ opacity: 0, y: -20 }} // Exit Animation
      transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth Transition
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
