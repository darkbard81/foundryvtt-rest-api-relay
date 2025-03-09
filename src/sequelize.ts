// src/sequelize.ts
import { DatabaseAdapter } from './database/adapter';
import { log } from './middleware/logger';

export const sequelize = DatabaseAdapter.getSequelize();

// Test the connection
sequelize.authenticate()
  .then(() => {
    log.info('Database connection has been established successfully.');
  })
  .catch(err => {
    log.error(`Unable to connect to the database: ${err.message}`);
  });
