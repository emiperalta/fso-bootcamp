require('dotenv').config();

const { PORT } = process.env;

const app = require('./app');

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
