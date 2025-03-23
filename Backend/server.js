const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/kathanamDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// ✅ Define User Schema
const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  password: String, // 🔥 Password field added
  role: String,
  gender: String,
  dob: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ✅ Signup Endpoint with Password Hashing
app.post("/signup", async (req, res) => {
  try {
    const { uid, name, email, password, role, gender, dob, location } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ uid, name, email, password: hashedPassword, role, gender, dob, location });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Login Endpoint with Password Verification
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    res.status(200).json({ message: "Login Successful!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get Profile Endpoint
app.get("/profile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
