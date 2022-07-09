import {Response} from 'express';

const express = require('express');
const app = express();

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
