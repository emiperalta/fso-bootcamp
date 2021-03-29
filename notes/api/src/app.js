const express = require('express');
const cors = require('cors');

const indexRoutes = require('./routes/index.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', indexRoutes);

module.exports = app;
