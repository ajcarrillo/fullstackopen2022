import patientsData from "../../data/patients.json";

export type Gender = "male" | "female"

export interface IPatient {
  id?: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

const patients: Array<IPatient> = patientsData as Array<IPatient>

const getPatients = (): Array<IPatient> => {
  return patients;
}

export default {
  getPatients
}
