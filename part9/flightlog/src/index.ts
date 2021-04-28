import express from 'express';

import diariesRoutes from './routes/diary.routes';

const app = express();

app.use(express.json());

app.use('/api/diaries', diariesRoutes);

app.listen(3001, () => console.log('Server running at http://localhost:3001'));
