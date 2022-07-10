import { v1 as uuid } from 'uuid'
import patientsData from "../../data/patients";
import { IPatient, NewPatient, PublicPatient } from "../types";

const patients: Array<IPatient> = patientsData as Array<IPatient>

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))
}

const addPatient = (patient: NewPatient): IPatient => {
  const newPatient: IPatient = {
    id: uuid(),
    ...patient
  }
  patients.push(newPatient);
  return newPatient;
}

const findPatient = (id: string): IPatient | undefined => {
  return patients.find(patient => patient.id === id);
}

export default {
  getPatients,
  addPatient,
  findPatient
}
