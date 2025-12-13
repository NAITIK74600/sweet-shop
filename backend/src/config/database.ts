import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Use Postgres for production, SQLite for development
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = isProduction && process.env.POSTGRES_URL
  ? new Sequelize(process.env.POSTGRES_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '..', '..', 'database.sqlite'),
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

export default sequelize;
