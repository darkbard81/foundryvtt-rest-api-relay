import { sequelize } from '../sequelize';
import { log } from '../utils/logger';

/**
 * Migration to add daily request tracking columns
 * This adds requestsToday and lastRequestDate columns to the Users table
 */
export async function migrateDailyRequestTracking(): Promise<void> {
  try {
    log.info('Starting migration to add daily request tracking columns');
    
    // Check if we're using memory store (skip migration)
    const isMemoryStore = process.env.DB_TYPE === 'memory';
    if (isMemoryStore) {
      log.info('Using memory store - skipping database migration');
      return;
    }

    // Check if sequelize has query method (only available for SQL databases)
    if (!('query' in sequelize)) {
      log.warn('Database does not support migrations - skipping');
      return;
    }

    // Add requestsToday column
    try {
      await (sequelize as any).query(`
        ALTER TABLE "Users" 
        ADD COLUMN "requestsToday" INTEGER DEFAULT 0;
      `);
      log.info('Added requestsToday column');
    } catch (error: any) {
      if (error.message.includes('already exists') || error.message.includes('duplicate column name')) {
        log.info('requestsToday column already exists - skipping');
      } else {
        throw error;
      }
    }

    // Add lastRequestDate column
    try {
      await (sequelize as any).query(`
        ALTER TABLE "Users" 
        ADD COLUMN "lastRequestDate" DATE;
      `);
      log.info('Added lastRequestDate column');
    } catch (error: any) {
      if (error.message.includes('already exists') || error.message.includes('duplicate column name')) {
        log.info('lastRequestDate column already exists - skipping');
      } else {
        throw error;
      }
    }

    // Initialize existing users with default values
    await (sequelize as any).query(`
      UPDATE "Users" 
      SET "requestsToday" = 0, "lastRequestDate" = NULL 
      WHERE "requestsToday" IS NULL OR "lastRequestDate" IS NULL;
    `);
    
    log.info('Migration completed successfully');
    
  } catch (error) {
    log.error('Migration failed', { error });
    throw error;
  }
}
