import patientsData from '../../data/patientsData';
import { Patient, NonSensitivePatientDetails } from '../types';

const getEntries = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitivePatientDetails = (): NonSensitivePatientDetails [] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};
const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  getNonSensitivePatientDetails,
  addEntry
};