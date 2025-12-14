import sequelize from '../config/database';
import User from './User';
import Sweet from './Sweet';

// Initialize models
const models = {
  User,
  Sweet
};

// Sync database (create tables if they don't exist)
export const syncDatabase = async (force: boolean = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to sync database:', error);
    throw error;
  }
};

// Test database connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to database:', error);
    throw error;
  }
};

export { User, Sweet, sequelize };
export default models;
