/* eslint-disable no-console */
require('dotenv').config();

const { Sequelize } = require('sequelize');
const pg = require('pg');

const client = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

console.log(process.env.DATABASE_URL);

client
  .authenticate()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.log('❌ PostgreSQL connection error:', err));

module.exports = {
  client,
};
