import { Sequelize } from 'sequelize';
import { log } from './middleware/logger';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  log.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === 'production';

export const sequelize = new Sequelize(dbUrl, {
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

// Test the connection
sequelize.authenticate()
  .then(() => {
    log.info('Database connection has been established successfully.');
  })
  .catch(err => {
    log.error(`Unable to connect to the database: ${err.message}`);
  });
