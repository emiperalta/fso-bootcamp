const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const noteRoutes = require('./routes/note.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', noteRoutes);

module.exports = app;
