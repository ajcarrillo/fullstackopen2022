import { v1 as uuid } from 'uuid'
import patientsData from "../../data/patients";
import { Entry, IPatient, NewPatient, PublicPatient } from "../types";
import { parseEntry, parseStringData } from '../utils';

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

const addEntry = (id: unknown, data: unknown): IPatient => {
  const patientId = parseStringData(id);
  const entry = parseEntry(data);
  const newEntry: Entry = { ...entry, id: uuid() };

  let patientFound = false;
  let newPatient: unknown;

  for (let i = 0; i < patients.length; i++) {
    if (patients[i].id === patientId) {
      patientFound = true;
      newPatient = { ...patients[i], entries: [...patients[i].entries, newEntry] };
      patients[i] = newPatient as IPatient;
      break;
    }
  }

  if (!patientFound) {
    throw new Error("Patient not found!");
  }

  return newPatient as IPatient;
};

export default {
  getPatients,
  addPatient,
  findPatient,
  addEntry
}
