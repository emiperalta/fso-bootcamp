const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const blogRoutes = require('./routes/blog.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(middleware.tokenExtractor);

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
if (process.env.NODE_ENV === 'test') {
  const testRoute = require('./routes/test.routes');
  app.use('/api/testing', testRoute);
}

app.use(middleware.errorHandler);

module.exports = app;
