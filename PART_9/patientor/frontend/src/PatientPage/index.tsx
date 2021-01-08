import React from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Icon } from 'semantic-ui-react';

import { Patient} from "../types";
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from "../constants";
import EntriesData from "../components/EntriesData";


const PatientPage: React.FC = () => {

const [, dispatch] = useStateValue();
const [singlePatient, setSinglePatient] = React.useState<Patient | undefined>();
const { id } = useParams<{ id: string }>();

const selectGenderIcon = (gender: string):'mars' | 'venus' | 'genderless' =>{
  if(gender === 'male'){
      return 'mars'
  }else if (gender === 'female'){
      return 'venus'
  }else{
      return 'genderless'
  }
}

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setSinglePatient(patientFromApi)
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [dispatch, id]);
   return (
        <> {singlePatient && 
              (<div>
                  <h2>{singlePatient.name}  <Icon name={selectGenderIcon(singlePatient.gender)} /></h2>
                  <p>{singlePatient.ssn}</p>
                  <p>{singlePatient.occupation}</p>
                  <h4>entries</h4>
                  {singlePatient.entries.map(e => <EntriesData entry={e}/>)}
              </div>)
          }
       </>
   ) 
};


export default PatientPage;
