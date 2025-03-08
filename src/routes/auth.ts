import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import crypto from 'crypto';

const router = Router();

// Middleware to increment request count
export const trackApiUsage = async (req: Request, res: Response, next: Function) => {
  const apiKey = req.header('x-api-key');
  
  if (apiKey) {
    try {
      const user = await User.findOne({ where: { apiKey } });
      if (user) {
        // Increment the requestsThisMonth count
        await user.increment('requestsThisMonth');
      }
    } catch (error) {
      console.error('Error tracking API usage:', error);
    }
  }
  
  next();
};

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
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

// Login route with more debugging
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Login attempt for: ${email}`);
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log(`User found: ${user.email}, comparing passwords...`);
    
    // Check password - add more debugging
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(`Password valid: ${isPasswordValid}`);
      
      if (!isPasswordValid) {
        console.log('Invalid password');
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
    } catch (bcryptError) {
      console.error('bcrypt comparison error:', bcryptError);
      return res.status(500).json({ error: 'Authentication error' });
    }
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
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
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