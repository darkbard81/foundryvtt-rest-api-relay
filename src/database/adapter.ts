// src/database/adapter.ts
import { Sequelize } from 'sequelize';
import { log } from '../middleware/logger';
import { MemoryStore } from './memoryStore';

export class DatabaseAdapter {
  static getSequelize() {
    const dbUrl = process.env.DATABASE_URL;
    const dbType = process.env.DB_TYPE || 'postgres';
    
    if (dbType === 'memory') {
      log.info('Using in-memory database');
      return new MemoryStore();
    }
    
    // Default to PostgreSQL
    if (!dbUrl) {
      log.error('DATABASE_URL environment variable is not set - stopping');
      process.exit(1);
    }
    
    const isProduction = process.env.NODE_ENV === 'production';
    
    return new Sequelize(dbUrl, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: isProduction ? {
          require: true,
          rejectUnauthorized: false
        } : false
      },
      logging: false
    });
  }
}