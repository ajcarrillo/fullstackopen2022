import diagnosesData from "../../data/diagnoses.json";

export interface IDiagnosis {
  code: string
  name: string
  latin?: string
}

const diagnoses: Array<IDiagnosis> = diagnosesData as Array<IDiagnosis>;

const getDiagnoses = (): Array<IDiagnosis> => {
  return diagnoses;
}

export default {getDiagnoses}

