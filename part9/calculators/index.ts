import express, {Request, Response} from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();

app.use(express.json());

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
  } catch (e: unknown) {
    const result = (e as Error).message;
    return res.status(400).json(result);
  }
})

app.post('/exercises', (req, res: Response) => {
  const body = req.body;
  const {target, daily_exercises} = body;

  if (!target || !daily_exercises) {
    return res.status(400).json({error: "parameters missing"});
  }

  if (
    isNaN(target) ||
    !isFinite(target) ||
    !(daily_exercises instanceof Array)
  ) {
    return res.status(400).json({error: "malformed parameters"});
  }

  daily_exercises.forEach((hours) => {
    if (isNaN(Number(hours)) || !isFinite(Number(hours))) {
      res.status(400).json({error: "malformed parameters"});
    }
  });

  try {
    const result = calculateExercises(target, daily_exercises);
    return res.json(result);
  } catch (e: unknown) {
    const result = (e as Error).message;
    return res.status(400).json(result);
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
