const jwt = require('jsonwebtoken');
const { ApiError } = require('../exceptions/apiError');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw ApiError.unauthorized();
  }

  const token = authHeader.split(' ')[1];

  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = userData;
    next();
  } catch (err) {
    throw ApiError.unauthorized();
  }
}

module.exports = {
  authMiddleware,
};
