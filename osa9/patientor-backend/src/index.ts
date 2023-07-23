/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import cors from 'cors';
import { Diagnose, Patient, NonSensitivePatient, NewEntry } from './types';
import diagnoseData from '../data/diagnoses';
import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { toNewEntry } from './utils';
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];
const getDiagnoses = (): Diagnose[] => {
  console.log('diag', diagnoses);
  return diagnoses;
}

const patientsWithoutEntries: Patient[] = patientData as Patient[];
const patients = patientsWithoutEntries.map((patient: Patient) => (
  patient.entries ? patient : { ...patient, entries: [] }
));

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
}

const addPatient = (entry: NewEntry): Patient => {
    const newPatient = {
      id: uuid(),
      ...entry,
      entries: []
    };
    patients.push(newPatient);
    return newPatient;
}

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  const entries = getDiagnoses();
  res.send(entries);
});

app.get('/api/patients', (_req, res) => {
  const entries = getNonSensitivePatients();
  res.send(entries);
});

app.get('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  const patient = patients.find(p => p.id === id);
  res.send(patient);
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = toNewEntry(req.body)
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});