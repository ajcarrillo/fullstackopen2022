import diagnosesData from "../../data/diagnoses";

export interface IDiagnosis {
  code: string
  name: string
  latin?: string
}

const getDiagnoses = (): Array<IDiagnosis> => {
  return diagnosesData;
}

export default { getDiagnoses }

