import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import crypto from 'crypto';
import { safeResponse } from './shared';
import { log } from '../utils/logger';

const router = Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  log.info('Registration attempt in auth.ts');
  try {
    const { email, password } = req.body;
    
    log.info(`Registration attempt for: ${email}`);
    
    if (!email || !password) {
      log.warn('Missing email or password');
      safeResponse(res, 400, { error: 'Email and password are required' });
      return;
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      log.warn(`User already exists: ${email}`);
      safeResponse(res, 409, { error: 'User already exists' });
      return;
    }
    
    log.info('Creating new user...');
    // Create a new user
    const user = await User.create({
      email,
      password, // Will be hashed by the beforeCreate hook
      apiKey: crypto.randomBytes(16).toString('hex'), // Explicitly generate an API key
      requestsThisMonth: 0
    });
    
    log.info(`User created: ${user.getDataValue('email')}`);
    
    // Return the user (exclude password but include API key)
    res.status(201).json({
      id: user.getDataValue('id'),
      email: user.getDataValue('email'),
      apiKey: user.getDataValue('apiKey'),
      createdAt: user.getDataValue('createdAt'),
      subscriptionStatus: user.getDataValue('subscriptionStatus') || 'free'
    });
    return;
  } catch (error) {
    log.error('Registration error', { error });
    safeResponse(res, 500, { error: 'Registration failed' });
    return;
  }
});

// Login route - update the password comparison logic
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    log.info(`Login attempt for: ${email}`);
    
    if (!email || !password) {
      log.warn('Missing email or password');
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }
    
    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      log.warn(`User not found: ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    
    log.info(`User found: ${email}, comparing passwords...`);
    
    try {
      // Get the stored hash directly from the data value
      const storedHash = user.getDataValue('password');
      log.debug('Stored hash status', { exists: !!storedHash });
      
      const isPasswordValid = await bcrypt.compare(password, storedHash);
      log.debug('Password comparison result', { isValid: isPasswordValid });
      
      if (!isPasswordValid) {
        log.warn('Invalid password');
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
      log.error('bcrypt comparison error', { error: bcryptError });
      res.status(500).json({ error: 'Authentication error' });
      return;
    }
  } catch (error) {
    log.error('Login error', { error });
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
    log.error('API key regeneration error', { error });
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
      requestsToday: user.getDataValue('requestsToday') || 0,
      subscriptionStatus: user.getDataValue('subscriptionStatus') || 'free',
      limits: {
        dailyLimit: parseInt(process.env.DAILY_REQUEST_LIMIT || '1000'),
        monthlyLimit: parseInt(process.env.FREE_API_REQUESTS_LIMIT || '100'),
        unlimitedMonthly: (user.getDataValue('subscriptionStatus') === 'active')
      }
    });
    return;
  } catch (error) {
    log.error('Error fetching user data', { error });
    res.status(500).json({ error: 'Failed to fetch user data' });
    return;
  }
});

export default router;