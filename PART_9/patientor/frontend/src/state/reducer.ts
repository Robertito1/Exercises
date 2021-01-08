import { State } from "./state";
import { Patient } from "../types";
import {Diagnosis} from "../types"

export type Action =
    {
    type: "UPDATE_PATIENT";
    payload: Patient;
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  |{
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[]
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "ADD_PATIENT":
      case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const updatePatient = (patientData: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patientData
  };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS',
    payload: diagnosisListFromApi
  };
};