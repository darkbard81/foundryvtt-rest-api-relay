import { sequelize } from '../sequelize';
import { User } from './user';

export async function initializeDatabase() {
  try {
    // Force: true will drop tables if they exist
    // Only use during development or first deployment
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    
    // Create initial admin user
    await User.create({
      email: 'admin@example.com',
      password: 'changeme', // This will be hashed by your User model hooks
      apiKey: require('crypto').randomBytes(16).toString('hex'),
      requestsThisMonth: 0
    });
    
    console.log('Initial admin user created');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Initialization script failed:', error);
      process.exit(1);
    });
}