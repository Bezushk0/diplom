/* eslint-disable no-unused-vars */
require('dotenv').config();

const { Token } = require('./src/models/token.js');
const { User } = require('./src/models/user.js');
const { ResetToken } = require('./src/models/resetToken.js');
const { client } = require('./src/config/db.js');

client.sync({ force: true });
