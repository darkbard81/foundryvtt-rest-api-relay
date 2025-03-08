import { sequelize } from '../sequelize';
import { User } from './user';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    console.log('Using database:', process.env.DATABASE_URL);
    
    // Test the connection first
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    console.log('Syncing database models...');
    await sequelize.sync({ force: true });
    console.log('Database models synchronized.');
    
    // Create a default admin user
    console.log('Creating admin user...');
    
    // Manual password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: hashedPassword, // Pre-hashed password
      apiKey: require('crypto').randomBytes(16).toString('hex'),
      requestsThisMonth: 0
    });
    
    console.log('Admin user created with API key:', adminUser.apiKey);
    
    // Verify the admin user was created with correct password hashing
    const user = await User.findOne({ where: { email: 'admin@example.com' } });
    if (!user) {
      console.error('Failed to retrieve the created admin user!');
      return false;
    }
    
    console.log('Admin user retrieved from database, verifying password...');
    const isPasswordValid = await bcrypt.compare('admin123', user.password);
    console.log('Password verification result:', isPasswordValid);
    
    console.log('\nDatabase initialization complete!');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  } finally {
    // Don't close the connection as it might be needed by the app
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