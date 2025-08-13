import { sequelize } from '../sequelize';
import { User } from './user'; 
import crypto from 'crypto';
import { log } from '../utils/logger';

async function initializeDatabase() {
  try {
    log.info('Starting database initialization...');
    log.info('Using database', { databaseUrl: process.env.DATABASE_URL });
    
    // Test the connection first
    await sequelize.authenticate();
    log.info('Database connection has been established successfully.');
    
    // Sync all models - this creates the tables
    log.info('Syncing database models...');
    await sequelize.sync({ force: true });
    log.info('Database models synchronized.');
    
    // Create a default admin user with a plain password - it will be hashed by the hook
    log.info('Creating admin user...');
    
    const user = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      apiKey: crypto.randomBytes(16).toString('hex'),
      requestsThisMonth: 0
    });
    
    // Check if user was created successfully
    if (!user) {
      log.error('Failed to create admin user!');
      return false;
    }
    
    log.info('Admin user created', { apiKey: user.getDataValue('apiKey') });
    log.info('Database initialization complete!');
    return true;
  } catch (error) {
    log.error('Database initialization failed', { error });
    return false;
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  initializeDatabase()
    .then((result) => {
      log.info(`Initialization ${result ? 'succeeded' : 'failed'}`);
      process.exit(result ? 0 : 1);
    })
    .catch(error => {
      log.error('Failed to initialize database', { error });
      process.exit(1);
    });
}

export { initializeDatabase };