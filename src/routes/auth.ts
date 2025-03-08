import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import crypto from 'crypto';

const router = Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    // Create a new user
    const user = await User.create({
      email,
      password,
      apiKey: crypto.randomBytes(16).toString('hex'),
      requestsThisMonth: 0
    });
    
    // Return the user (exclude password)
    res.status(201).json({
      id: user.id,
      email: user.email,
      apiKey: user.apiKey,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Return the user (exclude password)
    res.status(200).json({
      id: user.id,
      email: user.email,
      apiKey: user.apiKey,
      requestsThisMonth: user.requestsThisMonth,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Regenerate API key (for authenticated users)
router.post('/regenerate-key', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate new API key
    const newApiKey = crypto.randomBytes(16).toString('hex');
    await user.update({ apiKey: newApiKey });
    
    // Return the new API key
    res.status(200).json({
      apiKey: newApiKey
    });
  } catch (error) {
    console.error('API key regeneration error:', error);
    res.status(500).json({ error: 'Failed to regenerate API key' });
  }
});

export default router;