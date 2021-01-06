import React from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Patient } from "../types";
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from "../constants";


const PatientPage: React.FC = () => {

const [, dispatch] = useStateValue();
const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log(patientFromApi)
        // dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch, id]);
   return (
       <div></div>
   ) 
};


export default PatientPage;
