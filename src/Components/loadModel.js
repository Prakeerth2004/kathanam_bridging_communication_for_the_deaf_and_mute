import * as tf from "@tensorflow/tfjs";

let model = null; // Cache model to prevent reloading

export const loadModel = async () => {
  if (model) return model; // Return cached model

  try {
    console.log("⏳ Loading TensorFlow.js model...");
    model = await tf.loadLayersModel("/tfjs_model/model.json"); // Ensure correct path
    console.log("✅ Model Loaded Successfully!");
  } catch (error) {
    console.error("❌ Error loading model:", error);
    model = null;
  }

  return model;
};
