import express from 'express';
import patientsService from '../services/patientService';
import toNewPatientEntry from '../utils';
import {NewPatient} from '../types';

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
})

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    const result = (e as Error).message;
    res.status(400).send(result);
  }
})

export default router;
