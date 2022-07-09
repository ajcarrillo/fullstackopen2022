const express = require('express');
import {Request, Response} from 'express';
import {calculateBmi} from './bmiCalculator';

const app = express();

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    const bmi = calculateBmi(height, weight);
    if (typeof bmi !== 'string') {
      return res.status(400).json(bmi)
    }

    const result = {
      weight,
      height,
      bmi
    }

    return res.json(result);
  } catch (e) {
    return res.status(400).json(e.message);
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
