/* eslint-disable no-console */
require('dotenv').config();

const { Sequelize } = require('sequelize');
const pg = require('pg');

const client = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl:
        process.env.DB_HOST === 'localhost'
          ? false
          : {
            require: true,
            rejectUnauthorized: false,
          },
    },
    logging: false,
  },
);

console.log(process.env.DATABASE_URL);

client
  .authenticate()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.log('❌ PostgreSQL connection error:', err));

module.exports = {
  client,
};
