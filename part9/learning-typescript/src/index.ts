import express, { Request, Response } from 'express';

const app = express();

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
