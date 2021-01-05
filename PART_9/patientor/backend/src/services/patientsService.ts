import patientsData from '../../data/patientsData';
import { Patient, NonSensitivePatientDetails, NewPatientEntry } from '../types';

const getEntries = (): Array<Patient> => {
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

export default {
  getEntries,
  getNonSensitivePatientDetails,
  getSinglePatient,
  addPatient
};