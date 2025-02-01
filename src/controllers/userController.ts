import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/UserModel'; // Adjust based on your project structure

export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    const user = new User({ username, password });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // Send the response
    return res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
