// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); // for password hashing
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // for password hashing
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collections: [{ type: Schema.Types.ObjectId, ref: 'Collection' }],  // Reference to Task model
}, {
  timestamps: true,  // Created at and updated at timestamps
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
  }
  next();
});

// Method to check if entered password matches the hashed password in the database
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// Create the User model
const User = mongoose.model('User', userSchema);
export default User;
