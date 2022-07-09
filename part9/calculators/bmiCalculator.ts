interface IBmiValues {
  height: number
  weight: number
}

function validateArgs(height: number, weight: number): IBmiValues {
  if (height <= 0 || weight <= 0) {
    throw new Error("Invalid values!")
  }

  if (height >= 1000 || weight >= 1000) {
    throw new Error("Invalid values!")
  }

  if (!isNaN(height) && !isNaN(Number(weight))) {
    return {
      height,
      weight,
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

const parseArguments = (args: Array<string>): IBmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  const height: number = Number(args[2])
  const weight: number = Number(args[3])

  return validateArgs(height, weight);
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmiValues = validateArgs(height, weight);
  const bmi = bmiValues.weight / (bmiValues.height / 100) ** 2;
  return checkBmi(bmi);
}

const checkBmi = (bmi: number): string => {
  if (bmi < 15) {
    return "Very severely underweight"
  } else if (bmi < 16) {
    return "Severely underweight"
  } else if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight"
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)"
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)"
  } else {
    return "Obese Class III (Very severely obese)"
  }
}


try {
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
