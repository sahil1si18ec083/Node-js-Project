const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModal } = require("../models/User");
const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // check in data base whether user already exists

  const existingUser = await userModal.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const hashedPaswword = await bcrypt.hash(password, 10);
    const newUser = new userModal({ email: email, password: hashedPaswword });
    await newUser.save();
    const payload = {
      userId: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(201).cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript access
      sameSite: "strict", // Prevent CSRF (cross-site request forgery)
      maxAge: 60 * 60 * 1000, // Token expiration in milliseconds (1 hour)
    }).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);

    // Check if it's a validation error from mongoose
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errorMessages.join(', ') });
    }

    res.status(500).json({ error: "Not able to sign up" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT payload
    const payload = {
      userId: user._id,
      email: user.email,
    };

    // Generate JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" }); // Token expires in 12 hour
    console.log("before")


    console.log(token)

    console.log("after")

    // Set the token as an HTTP-only cookie
    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: true, // Prevents client-side JavaScript access
        
        sameSite: "strict", // Prevent CSRF
        maxAge: 60 * 60 * 1000, // Token expiration in milliseconds (1 hour)
      })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errorMessages.join(', ') });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signup, login };
