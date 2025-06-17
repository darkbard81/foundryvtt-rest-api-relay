// Script to manually trigger a monthly request count reset
// This can be used for testing or if a reset needs to be run outside the regular schedule
import { resetMonthlyRequests } from '../src/cron/monthlyReset';
import { log } from '../src/middleware/logger';
import { sequelize } from '../src/sequelize';
import { config } from 'dotenv';

// Load environment variables
config();

async function main() {
  log.info('Starting manual request count reset...');
  
  try {
    // Initialize database connection
    await sequelize.sync();
    log.info('Database connection established');
    
    await resetMonthlyRequests();
    log.info('Manual request count reset completed successfully');
  } catch (error) {
    log.error(`Error during manual reset: ${error}`);
    process.exit(1);  } finally {
    // Close database connection if it's a real Sequelize instance
    if ('close' in sequelize && typeof sequelize.close === 'function') {
      await sequelize.close();
      log.info('Database connection closed');
    }
  }
  
  process.exit(0);
}

main();
