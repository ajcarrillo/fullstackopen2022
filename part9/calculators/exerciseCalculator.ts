interface IExerciseParams {
  targetHours: number;
  dailyHours: Array<number>;
}

interface IExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExercisesArguments = (args: Array<string>): IExerciseParams => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  const targetHours: number = Number(args[2]);
  const dailyHours: Array<number> = args.slice(3).map(Number);

  return {
    targetHours,
    dailyHours,
  };
}

const calculateExercises = (targetHours: number, dailyHours: Array<number>): IExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hour => hour > 0).length;
  const average = dailyHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
  const success = average >= targetHours;
  const rating = success ? 3 : 2;
  const ratingDescription = success ? "good" : "not too bad but could be better";
  const target = targetHours;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

//console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));
try {
  const {targetHours, dailyHours} = parseExercisesArguments(process.argv);
  console.log(calculateExercises(targetHours, dailyHours))
} catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
