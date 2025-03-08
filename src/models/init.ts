import { sequelize } from '../sequelize';
import { User } from './user'; 
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    console.log('Using database:', process.env.DATABASE_URL);
    
    // Test the connection first
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models - this creates the tables
    console.log('Syncing database models...');
    await sequelize.sync({ force: true });
    console.log('Database models synchronized.');
    
    // Create a default admin user with a plain password - it will be hashed by the hook
    console.log('Creating admin user...');
    
    const user = await User.create({
      email: 'admin@example.com',
      password: 'admin123',
      apiKey: crypto.randomBytes(16).toString('hex'),
      requestsThisMonth: 0
    });
    
    // Check if user was created successfully
    if (!user) {
      console.error('Failed to create admin user!');
      return false;
    }
    
    console.log('Admin user created with API key:', user.getDataValue('apiKey'));
    console.log('Database initialization complete!');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

// Run the function if this script is executed directly
if (require.main === module) {
  initializeDatabase()
    .then((result) => {
      console.log(`Initialization ${result ? 'succeeded' : 'failed'}`);
      process.exit(result ? 0 : 1);
    })
    .catch(error => {
      console.error('Failed to initialize database:', error);
      process.exit(1);
    });
}

export { initializeDatabase };