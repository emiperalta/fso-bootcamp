const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('./config');

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Token missing or invalid.' });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const { token } = req;
  if (!token) return res.status(401).json({ error: 'Token missing or invalid.' });
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken.id)
    return res.status(401).json({ error: 'Token missing or invalid.' });

  const user = await User.findById(decodedToken.id);
  req.userFromDB = user;
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
