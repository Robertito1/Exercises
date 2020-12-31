import { GenderType, NewPatientEntry } from './types';

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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
  return newEntry;
};

export default toNewPatientEntry;

