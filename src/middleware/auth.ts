import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  const user = await User.findOne({ where: { apiKey } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  if (user.requestsThisMonth >= 1000) { // Example limit
    return res.status(429).json({ error: 'Request limit exceeded. Please sign up for a premium plan.' });
  }

  req.user = user;
  next();
};
