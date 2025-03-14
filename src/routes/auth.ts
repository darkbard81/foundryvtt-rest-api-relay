import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import crypto from 'crypto';

const router = Router();

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

// Login route - update the password comparison logic
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Login attempt for: ${email}`);
    
    if (!email || !password) {
      console.log('Missing email or password');
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(`User not found: ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    console.log(`User found: ${email}, comparing passwords...`);
    
    try {
      // Get the stored hash directly from the data value
      const storedHash = user.getDataValue('password');
      console.log('Stored hash:', storedHash ? 'exists' : 'missing');
      
      const isPasswordValid = await bcrypt.compare(password, storedHash);
      console.log(`Password valid: ${isPasswordValid}`);
      
      if (!isPasswordValid) {
        console.log('Invalid password');
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }
      
      // Return the user (exclude password)
      res.status(200).json({
        id: user.getDataValue('id'),
        email: user.getDataValue('email'),
        apiKey: user.getDataValue('apiKey'),
        requestsThisMonth: user.getDataValue('requestsThisMonth'),
        createdAt: user.getDataValue('createdAt')
      });
      return;
    } catch (bcryptError) {
      console.error('bcrypt comparison error:', bcryptError);
      res.status(500).json({ error: 'Authentication error' });
      return;
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
    return;
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

// Get user data (for authenticated users)
router.get('/user-data', async (req: Request, res: Response) => {
  try {
    // Get API key from header
    const apiKey = req.header('x-api-key');
    
    if (!apiKey) {
      res.status(401).json({ error: 'API key is required' });
      return;
    }
    
    // Find user by API key
    const user = await User.findOne({ where: { apiKey } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    // Return user data (exclude sensitive information)
    res.status(200).json({
      id: user.getDataValue('id'),
      email: user.getDataValue('email'),
      apiKey: user.getDataValue('apiKey'),
      requestsThisMonth: user.getDataValue('requestsThisMonth'),
      freeApiRequestsLimit: process.env.FREE_API_REQUESTS_LIMIT || 100,
      subscriptionStatus: user.getDataValue('subscriptionStatus') || 'free',
    });
    return;
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
    return;
  }
});

export default router;