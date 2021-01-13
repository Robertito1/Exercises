import React from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react';

import { Patient} from "../types";
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from "../constants";
import EntriesData from "../components/EntriesData";
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';


const PatientPage: React.FC = () => {

const [modalOpen, setModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();
const [, dispatch] = useStateValue();
const [singlePatient, setSinglePatient] = React.useState<Patient | undefined>();
const { id } = useParams<{ id: string }>();

const openModal = (): void => setModalOpen(true);

const closeModal = (): void => {
  setModalOpen(false);
};

const selectGenderIcon = (gender: string):'mars' | 'venus' | 'genderless' =>{
  if(gender === 'male'){
      return 'mars'
  }else if (gender === 'female'){
      return 'venus'
  }else{
      return 'genderless'
  }
}

const submitNewEntry = async (values: EntryFormValues) => {
  try {
   await axios.post<EntryFormValues>(
      `${apiBaseUrl}/patients/${id}/entries`,
      values
    )
   closeModal();
   const { data: patientFromApi } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
       setSinglePatient(patientFromApi)
        dispatch(updatePatient(patientFromApi));
  } catch (e) {
    console.error(e.response.data);
    setError(e.response.data.error);
  }
};

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
                  {singlePatient.entries.map(e => <EntriesData key={e.id} entry={e}/>)}
              </div>)
          }
        <AddEntryModal modalOpen={modalOpen}
            error={error}
            onSubmit={submitNewEntry}
            onClose={closeModal}/>
          <Button onClick={() => openModal()}>Add New Entry</Button>
       </>
   ) 
};


export default PatientPage;
