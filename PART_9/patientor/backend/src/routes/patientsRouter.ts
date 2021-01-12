import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry, {toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatientDetails());
});

router.get('/:id',(req, res) =>{
  const id = req.params.id;
  res.send(patientsService.getSinglePatient(id));
});
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
    
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getSinglePatient(id);
  try {
     const newEntry = toNewEntry(req.body);
     const updatedPatient = patientsService.addEntry(newEntry, patient);
    res.json(updatedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;