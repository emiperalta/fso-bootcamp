const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const noteRoutes = require('./routes/note.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
