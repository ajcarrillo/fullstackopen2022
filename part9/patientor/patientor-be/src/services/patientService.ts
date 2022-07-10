import {v1 as uuid} from 'uuid'
import patientsData from "../../data/patients.json";
import {IPatient, NewPatient} from "../types";

const patients: Array<IPatient> = patientsData as Array<IPatient>

const getPatients = (): Array<IPatient> => {
  return patients;
}

const addPatient = (patient: NewPatient): IPatient => {
  const newPatient: IPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  addPatient
}
