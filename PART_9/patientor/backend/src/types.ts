export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  export interface SickLeave {
      startDate: string;
      endDate: string;
  }

  export interface Discharge{
      date: string;
      criteria: string;
  }
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  interface OccupationalHealthcareEntry extends BaseEntry{
      type: "OccupationalHealthcare";
      employerName: string
      sickLeave?: SickLeave
  }

  interface HospitalEntry extends BaseEntry{
      type: "Hospital"
      discharge: Discharge;
  }
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientDetails = Omit<Patient, 'ssn'  | 'entries' >;

export type NewEntry = Omit<Entry, 'id'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export enum GenderType {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }