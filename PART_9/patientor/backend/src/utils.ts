import { Entry, GenderType, NewPatientEntry, Discharge, SickLeave, HealthCheckRating, BaseEntry } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string =>{
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing Name: ' + name);
}
return name;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const isGender = (param: any): param is GenderType => {
  return Object.values(GenderType).includes(param);
};

const parseGender = (gender: any): GenderType => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isSSN = (param: any): boolean => {
  return param.length >= 10 && param.length < 12;
};

const parseSSN = (ssn: any): string =>{
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
}
return ssn;
};
const parseOccupation = (occupation: any): string =>{
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
}
return occupation;
};
const parseEntries = (entries: any): [] => {
  if(!entries){
    throw new Error('Incorrect or missing entrie: ' + entries);
  }
  return entries;
};
const parseDescription = (description: any): string =>{
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
}
return description;
};
const parseSpecialist = (specialist: any): string =>{
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
}
return specialist;
};
const parseDiagnosisCode = (diagnosisCode: any): string[] =>{
  if (!diagnosisCode) {
    throw new Error('Incorrect or missing diagnosis Code: ' + diagnosisCode);
}
return diagnosisCode;
};
const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Missing rating`);
  }
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
    throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return ratingNumber;
};

const parseDischarge = (discharge: any): Discharge =>{
  if (!discharge) {
    throw new Error('Incorrect or missing diagnosis Code: ' + discharge);
}
return discharge;
};

const parseEmployerName = (employerName: any): string =>{
  if (!employerName || !isString(employerName) ) {
    throw new Error('Incorrect or missing diagnosis Code: ' + employerName);
}
return employerName;
};
const parseSickLeave = (sickLeave: any): SickLeave =>{
  if (!sickLeave) {
    throw new Error('Incorrect or missing diagnosis Code: ' + sickLeave);
}
return sickLeave;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  return newEntry;
};

export default toNewPatientEntry;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: String(Math.floor(Math.random() * 1000000)),
    description: parseDescription(object.description),
    date: parseDateOfBirth(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCode(object.diagnosisCodes),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = parseSickLeave(object.sickLeave);
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
};