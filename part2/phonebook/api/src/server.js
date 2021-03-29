const app = require('./app');

const { HOST, PORT } = process.env;

app.listen(PORT, (req, res) =>
  console.log(`Server running at http://${HOST}:${PORT}`)
);
