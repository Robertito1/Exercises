import patientsData from '../../data/patientsData';
import { Patient, NonSensitivePatientDetails, NewPatientEntry, Entry } from '../types';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getSinglePatient = (id: string): Patient =>{
const patient: Patient = patientsData.find(e => e.id === id) as Patient;
return patient;
};
const getNonSensitivePatientDetails = (): NonSensitivePatientDetails [] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};
const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = {
    id: String(Math.floor(Math.random() * 1000000)),
    ...entry
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (entry: Entry, patient : Patient ): Patient => {
 patient.entries.push(entry);
 return patient;
};

export default {
  getPatients,
  getNonSensitivePatientDetails,
  getSinglePatient,
  addPatient,
  addEntry
};