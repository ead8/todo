import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/auth.js'; // Import the User model
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret=process.env.JWT_SECRET
// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    // Create a new user with a hashed password
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password:newPassword } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
console.log("user",user)
    // Compare the entered password with the hashed password
    const validPassword = await bcrypt.compare(newPassword, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
    // Generate a JWT token with the user's ID
    const token = jwt.sign({ id: user._id.toString() }, jwtSecret, { expiresIn: '1d' });
    // Remove the password field from the user object before sending the response
    const { password, ...userWithoutPassword } = user._doc;
    const data = {
      token,
      user: userWithoutPassword
    };
    // Send the token and user info in the response
   res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the existing token
    const decoded = jwt.verify(token, 'secret', { ignoreExpiration: true });

    // Generate a new token
    const newToken = jwt.sign({ id: decoded.id }, 'secret', { expiresIn: '1d' });

    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
