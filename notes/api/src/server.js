require('dotenv').config();

const { HOST, PORT } = process.env;

const app = require('./app');

app.listen(PORT, () => console.log(`Server running on port http://${HOST}:${PORT}`));
