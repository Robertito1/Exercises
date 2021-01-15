import React from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react';

import { Entry, Patient} from "../types";
import { useStateValue, updatePatient } from '../state';
import { apiBaseUrl } from "../constants";
import EntriesData from "../components/EntriesData";
import AddHealthEntryModal from '../AddHealthEntryModal';
import AddHospitalEntryModal from '../AddHospitalEntryModal';
import AddOccupationalEntryModal from '../AddOccupationalEntryModal'

type EntryFormValues = Omit<Entry, "id">;

const PatientPage: React.FC = () => {

const [modalHealthOpen, setHealthModalOpen] = React.useState<boolean>(false);
const [modalHospitalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
const [modalOccupationalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);
const [error, setError] = React.useState<string | undefined>();
const [, dispatch] = useStateValue();
const [singlePatient, setSinglePatient] = React.useState<Patient | undefined>();
const { id } = useParams<{ id: string }>();

const openHealthModal = (): void => setHealthModalOpen(true);
const openHospitalModal = (): void => setHospitalModalOpen(true);
const openOccupationalModal = (): void => setOccupationalModalOpen(true);



const closeModal = (): void => {
  setHealthModalOpen(false);
  setHospitalModalOpen(false);
  setOccupationalModalOpen(false);
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
           <AddHealthEntryModal modalHealthOpen={modalHealthOpen}
            error={error}
            onSubmit={submitNewEntry}
            onClose={closeModal}/>
            <AddHospitalEntryModal modalHospitalOpen={modalHospitalOpen}
            error={error}
            onSubmit={submitNewEntry}
            onClose={closeModal} />
            <AddOccupationalEntryModal modalOccupationalOpen={modalOccupationalOpen}
            error={error}
            onSubmit={submitNewEntry}
            onClose={closeModal} />
          <Button onClick={() => openHealthModal()} style={{marginTop:"20px"}}>Add New Health Check Entry</Button>
          <Button onClick={() => openHospitalModal()} style={{marginTop:"20px"}}>Add New Hospital Entry</Button>
          <Button onClick={() => openOccupationalModal()} style={{marginTop:"20px"}}>Add New Occupational Health Care Entry</Button>
       </>
   ) 
};


export default PatientPage;
