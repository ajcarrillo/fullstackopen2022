import express from 'express';
import patientsService from '../services/patientService';
import toNewPatient, { parseEntry } from '../utils';
import { NewPatient } from '../types';

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
})

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: unknown) {
    const result = (e as Error).message;
    res.status(400).send(result);
  }
})

router.get("/:id", (req, res) => {
  const patient = patientsService.findPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = parseEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    const result = (e as Error).message;
    res.status(400).send(result);
  }
})

export default router;
