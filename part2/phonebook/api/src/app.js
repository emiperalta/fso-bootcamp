require('dotenv/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const personRoutes = require('./routes/person.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', personRoutes);

module.exports = app;
